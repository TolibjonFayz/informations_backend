import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInAdminDto {
  @ApiProperty({ example: 'Falonchioff@gmail.com', description: 'Email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'qwerty', description: 'Parol' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
