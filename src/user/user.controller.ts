import {
  Controller,
  Post,
  Body,
  Res,
  Param,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignupUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { SignInUserDto } from './dto/signin-user.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { User } from './model/user.model';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //SignUp user
  @ApiOperation({ summary: 'Signup user' })
  @Post('signup')
  async signUp(
    @Body() signUpUserDto: SignupUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.signUpUser(signUpUserDto, res);
  }

  //SignIn user
  @ApiOperation({ summary: 'SignIn user' })
  @Post('signin')
  async signIn(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.signInUser(signInUserDto, res);
  }

  //Signout user
  @ApiOperation({ summary: 'SignOut user' })
  @Post('signout')
  async signOut(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.signOutUser(refresh_token, res);
  }

  //RefreshToken user
  @ApiOperation({ summary: 'Refresh token' })
  @Post(':id/refresh')
  async refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.refreshtoken(+id, refreshToken, res);
  }

  //Get all users
  @ApiOperation({ summary: 'Get all admins' })
  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  //Get user by id
  @ApiOperation({ summary: 'Get user by id' })
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  //Update user by id
  @ApiOperation({ summary: 'Update user by id' })
  @Put('update/:id')
  async updateUserById(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  //Delete user by id
  @ApiOperation({ summary: 'Delete user by id' })
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }
}
