import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAdminDto {
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
}
