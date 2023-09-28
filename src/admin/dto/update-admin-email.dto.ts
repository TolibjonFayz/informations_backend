import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAdminEmailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  new_email: string;
}
