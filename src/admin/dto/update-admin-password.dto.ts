import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAdminPassDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirm_password: string;
}
