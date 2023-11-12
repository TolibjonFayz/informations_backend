import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignupAdminDto {
  @ApiProperty({ example: 'Falonchi', description: 'Ism' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Falonchiyev', description: 'Familiya' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: '+998901234567', description: 'Raqam' })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({ example: 'Falonchioff@gmail.com', description: 'Email' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'qwerty', description: 'Parol' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'qwerty', description: 'Tepadagi parolni repeat' })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  is_creator: boolean;
}
