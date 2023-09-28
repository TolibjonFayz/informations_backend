import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { SignupAdminDto } from './dto/sign-up.admin.dto';
import { Response } from 'express';
import { SignInAdminDto } from './dto/signin_admin.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { Admin } from './model/admin.model';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdateAdminPassDto } from './dto/update-admin-password.dto';
import { UpdateAdminEmailDto } from './dto/update-admin-email.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  //SignUp
  @Post('signup')
  async signUp(
    @Body() signUpAdminDto: SignupAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signUp(signUpAdminDto, res);
  }

  //Activate admin
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.adminService.activateAdmin(link);
  }

  //SignIn admin
  @Post('signin')
  async signin(
    @Body() signInAdminDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signIn(signInAdminDto, res);
  }

  //SignOut admin
  @Post('signout')
  async signOut(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signOut(refresh_token, res);
  }

  //RefreshToken Admin
  @Post(':id/refresh')
  async refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshtoken(+id, refreshToken, res);
  }

  //Get all admins
  @Get('all')
  async getAllAdmin(): Promise<Admin[] | any> {
    return this.adminService.getAllAdmins();
  }

  //Get admin by id
  @Get(':id')
  async getAdminById(@Param('id') id: number): Promise<Admin | any> {
    return this.adminService.getAdminById(id);
  }

  //Update admin by id
  @Put(':id')
  async updateAdmin(
    @Param('id') id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    return this.adminService.updateAdmin(+id, updateAdminDto);
  }

  //Update Admin password by id
  @Put('pass/:id')
  async updateAdminPass(
    @Param('id') id: number,
    @Body() updateAdminPassDto: UpdateAdminPassDto,
  ): Promise<Admin> {
    return this.adminService.updateAdminPassword(+id, updateAdminPassDto);
  }

  //update admin email by id
  @Put('email/:id')
  async updateAdminEmail(
    @Param('id') id: number,
    @Body() updateAdminEmailDto: UpdateAdminEmailDto,
  ): Promise<Admin> {
    return this.adminService.updateAdminEmailById(id, updateAdminEmailDto);
  }

  //Delete admin by id
  @Delete(':id')
  async deleteAdmin(@Param('id') id: number): Promise<string> {
    return this.adminService.deleteAdminById(id);
  }
}
