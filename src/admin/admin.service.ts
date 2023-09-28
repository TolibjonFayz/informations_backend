import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupAdminDto } from './dto/sign-up.admin.dto';
import { Response } from 'express';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './model/admin.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../mail/mail.service';
import { SignInAdminDto } from './dto/signin_admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdateAdminPassDto } from './dto/update-admin-password.dto';
import { UpdateAdminEmailDto } from './dto/update-admin-email.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private AdminRepository: typeof Admin,
    private readonly jwtservice: JwtService,
    private readonly mailService: MailService,
  ) {}

  //Sign Up admin
  async signUp(signupAdminDto: SignupAdminDto, res: Response) {
    //check admin is exists?
    const admin = await this.AdminRepository.findOne({
      where: { email: signupAdminDto.email },
    });
    if (admin) throw new BadRequestException('Admin already exists');

    //check password
    if (signupAdminDto.password !== signupAdminDto.confirm_password) {
      console.log('Password does not match');
      throw new BadRequestException('Password does not match');
    }

    //hashing password
    const hashed_password = await bcrypt.hash(signupAdminDto.password, 7);
    const newAdmin = await this.AdminRepository.create({
      ...signupAdminDto,
      password: hashed_password,
    });

    //refresh va access token generating
    const tokens = await this.getTokens(newAdmin);

    //Update admin
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const uniqueKey: string = uuidv4();
    const updateAdmin = await this.AdminRepository.update(
      {
        refresh_token: hashed_refresh_token,
        unique_id: uniqueKey,
      },
      {
        where: { id: newAdmin.id },
        returning: true,
      },
    );

    //Cookie putting
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    const response = {
      message: 'Admin signed up successfully',
      admin: updateAdmin[1][0],
      tokens,
    };

    //sending email to admin
    try {
      await this.mailService.sendAdminConfrmation(updateAdmin[1][0]);
    } catch (error) {
      console.log(error);
    }

    //Send response to frontend
    return response;
  }

  //Token generation
  async getTokens(admin: Admin) {
    const JwtPayload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtservice.signAsync(JwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtservice.signAsync(JwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  //Activate admin
  async activateAdmin(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }
    const updateAdmin = await this.AdminRepository.update(
      { is_active: true },
      { where: { unique_id: link, is_active: false }, returning: true },
    );
    if (!updateAdmin[1][0]) {
      throw new BadRequestException(
        'Admin (siz) allaqachon aktivlashtirilgansiz!',
      );
    }
    const response = {
      message: 'Admin muvaffaqiyatli yangilandi',
      worker: updateAdmin,
    };

    return response;
  }

  //Sign in admin
  async signIn(signInAdminDto: SignInAdminDto, res: Response) {
    const { email, password } = signInAdminDto;
    //Admin is exists?
    const admin = await this.AdminRepository.findOne({ where: { email } });
    if (!admin) {
      throw new UnauthorizedException('Admin has not registered');
    }
    //passwords does not match
    const itMatches = await bcrypt.compare(password, admin.password);
    if (!itMatches) {
      throw new UnauthorizedException('Password is wrong!');
    }

    //Generate new tokens
    const tokens = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const updateAdmin = await this.AdminRepository.update(
      { refresh_token: hashed_refresh_token },
      { where: { id: admin.id }, returning: true },
    );

    //Cookie setting
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 10000,
      httpOnly: true,
    });

    //sending response to frontend
    const response = {
      message: 'Admin signin successfully',
      admin: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  //Sign out admin
  async signOut(refresh_token: string, res: Response) {
    const adminData = await this.jwtservice.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    //Is admin exists?
    if (!adminData) throw new ForbiddenException('Admin not found');
    const updateAdmin = await this.AdminRepository.update(
      { refresh_token: null },
      { where: { id: adminData.id }, returning: true },
    );

    //Clearing cookie
    res.clearCookie('refresh_token');
    const response = {
      message: 'Admin signed out successfully',
      admin: updateAdmin[1][0],
    };
    return response;
  }

  //Refreshtoken admin
  async refreshtoken(admin_id: number, refresh_token: string, res: Response) {
    const decodedToken = this.jwtservice.decode(refresh_token);
    if (admin_id != decodedToken['id']) {
      throw new BadRequestException('You can not do this action');
    }

    const admin = await this.AdminRepository.findOne({
      where: { id: admin_id },
    });
    if (!admin || !admin.refresh_token) {
      throw new BadRequestException('Admin not found');
    }

    const tokenMatch = await bcrypt.compare(refresh_token, admin.refresh_token);
    if (!tokenMatch) throw new ForbiddenException('Forbidden');

    const token = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(token.refreshToken, 7);
    const updateAdmin = await this.AdminRepository.update(
      { refresh_token: hashed_refresh_token },
      { where: { id: admin.id }, returning: true },
    );
    res.cookie('refresh_token', token.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'Admin refreshsheed',
      admin: updateAdmin[1][0],
      token,
    };
    return response;
  }

  //Get all admins
  async getAllAdmins() {
    const admins = await this.AdminRepository.findAll();
    if (admins.length > 0) return admins;
    else return 'Ant admin not found';
  }

  //Get admin by id
  async getAdminById(id: number) {
    const admin = await this.AdminRepository.findByPk(id);
    if (admin) return admin;
    else return 'Admin not found at this id';
  }

  //Update admin by id
  async updateAdmin(id: number, updateAdminDto: UpdateAdminDto) {
    const updating = await this.AdminRepository.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return updating[1][0].dataValues;
  }

  //Update admin password
  async updateAdminPassword(
    id: number,
    updaetAdminPassDto: UpdateAdminPassDto,
  ) {
    if (updaetAdminPassDto.password !== updaetAdminPassDto.confirm_password) {
      throw new BadRequestException('Passwords doest match');
    }
    const hashed_password = await bcrypt.hash(updaetAdminPassDto.password, 7);
    const updating = await this.AdminRepository.update(
      { password: hashed_password },
      { where: { id }, returning: true },
    );
    return updating[1][0].dataValues;
  }

  //Update admin email
  async updateAdminEmailById(
    id: number,
    updateAdmimEmailDto: UpdateAdminEmailDto,
  ) {
    const updating = await this.AdminRepository.update(
      { email: updateAdmimEmailDto.new_email, is_active: false },
      { where: { id }, returning: true },
    );

    try {
      await this.mailService.sendAdminConfrmation(updating[1][0]);
    } catch (error) {
      console.log(error);
    }
    return updating[1][0].dataValues;
  }

  //Delete admin by id
  async deleteAdminById(id: number) {
    const deleting = await this.AdminRepository.destroy({ where: { id } });
    if (deleting) return 'Admin deleted successfully';
    else return 'Admin not found at this id or smt wrong';
  }
}
