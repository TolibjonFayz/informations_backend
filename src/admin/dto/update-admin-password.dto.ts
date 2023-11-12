import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAdminPassDto {
  @ApiProperty({ example: 'qwerty', description: 'Parol' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'qwerty', description: 'Tepadagi parolni repeat' })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;
}
