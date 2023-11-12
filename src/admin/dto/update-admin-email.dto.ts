import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAdminEmailDto {
  @ApiProperty({ example: 'falonchioff@gmail.com', description: 'Yangi email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  new_email: string;
}
