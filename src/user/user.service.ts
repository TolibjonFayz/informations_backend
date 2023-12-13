import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { SignupUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import { SignInUserDto } from './dto/signin-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private UserRepository: typeof User,
    private readonly jwtservice: JwtService,
  ) {}

  //SignUp admin
  async signUpUser(signUpUserDto: SignupUserDto, res: Response) {
    //User is exists?
    const user = await this.UserRepository.findOne({
      where: { email: signUpUserDto.email },
    });
    if (user) throw new BadRequestException('User alreadye exists');

    //checking password
    if (signUpUserDto.password !== signUpUserDto.confirm_password) {
      console.log('Password does not match');
      throw new BadRequestException('Passwords does not match');
    }

    //password is hashing
    const hashed_password = await bcrypt.hash(signUpUserDto.password, 7);
    const newuser = await this.UserRepository.create({
      ...signUpUserDto,
      password: hashed_password,
    });

    //refresh and access tokens are generating
    const tokens = await this.getTokens(newuser);

    //Update user
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const updateUser = await this.UserRepository.update(
      {
        refresh_token: hashed_refresh_token,
      },
      {
        where: { id: newuser.id },
        returning: true,
      },
    );

    // cookie setting
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    //Sending data to front
    const response = {
      message: 'User signed up successfully',
      user: updateUser[1][0],
      tokens,
    };
    return response;
  }

  //Token generation
  async getTokens(user: User) {
    const JwtPayload = {
      id: user.id,
      email: user.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtservice.signAsync(JwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY_USER,
        expiresIn: process.env.ACCESS_TOKEN_TIME_USER,
      }),
      this.jwtservice.signAsync(JwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY_USER,
        expiresIn: process.env.REFRESH_TOKEN_TIME_USER,
      }),
    ]);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  //Signin user
  async signInUser(siginUserDto: SignInUserDto, res: Response) {
    const { email, password } = siginUserDto;
    //Is user exists?
    const user = await this.UserRepository.findOne({
      where: { email: siginUserDto.email },
    });
    if (!user) throw new UnauthorizedException('User has not registered');

    //Checking passwords
    const isMatches = await bcrypt.compare(password, user.password);
    if (!isMatches) throw new UnauthorizedException('Password is wrong!');

    //Generate new tokens
    const tokens = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const updateUser = await this.UserRepository.update(
      { refresh_token: hashed_refresh_token },
      { where: { id: user.id }, returning: true },
    );

    //Cookie setting
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 10000,
      httpOnly: true,
    });

    const response = {
      message: 'User signed in successfully',
      user: updateUser[1][0],
      tokens,
    };
    return response;
  }

  //SignOut user
  async signOutUser(refresh_token: string, res: Response) {
    const UserData = await this.jwtservice.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY_USER,
    });

    //Is User exists?
    if (!UserData) throw new ForbiddenException('User not found');
    const updateUser = await this.UserRepository.update(
      { refresh_token: null },
      { where: { id: UserData.id }, returning: true },
    );

    //Clearing cookie
    res.clearCookie('refresh_token');
    const response = {
      message: 'User signed out successfully',
      user: updateUser[1][0],
    };
    return response;
  }

  //Refreshtoken user
  async refreshtoken(user_id: number, refresh_token: string, res: Response) {
    const decodedToken = this.jwtservice.decode(refresh_token);
    if (user_id != decodedToken['id']) {
      throw new BadRequestException('You can not do this action');
    }

    const user = await this.UserRepository.findOne({
      where: { id: user_id },
    });
    if (!user || !user.refresh_token) {
      throw new BadRequestException('User not found');
    }

    const tokenMatch = await bcrypt.compare(refresh_token, user.refresh_token);
    if (!tokenMatch) throw new ForbiddenException('Forbidden');

    const token = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(token.refreshToken, 7);
    const updateuser = await this.UserRepository.update(
      { refresh_token: hashed_refresh_token },
      { where: { id: user.id }, returning: true },
    );
    res.cookie('refresh_token', token.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'User refreshsheed',
      admin: updateuser[1][0],
      token,
    };
    return response;
  }

  //Get all users
  async getAllUsers() {
    const users = await this.UserRepository.findAll();
    if (!users.length) {
      throw new NotFoundException('Any user not found');
    }
    return users;
  }

  //Get one user by id
  async getUserById(id: number) {
    const user = await this.UserRepository.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found at this id');
    }
    return user;
  }

  //Update user by id
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.UserRepository.findByPk(id);
    if (user) {
      const updating = await this.UserRepository.update(updateUserDto, {
        where: { id: id },
        returning: true,
      });
      return updating[1][0].dataValues;
    }
    throw new BadRequestException('User not found or smt wrong');
  }

  //Delete user by id
  async deleteUserById(id: number) {
    const user = await this.UserRepository.findByPk(id);
    if (user) {
      const deleting = await this.UserRepository.destroy({ where: { id: id } });
      return deleting;
    }
    throw new BadRequestException('User not found ot smt wrong');
  }
}
