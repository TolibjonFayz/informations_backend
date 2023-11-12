import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignupUserDto {
  @ApiProperty({ example: 'Toshmat', description: 'Ism' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Toshmatov', description: 'Familiya' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: 'Toshmatov', description: 'Familiya' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'toshmat@gmail.com', description: 'Email' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'qwerty', description: 'Parol' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'qwerty', description: 'Parol' })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;
}
