import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Science', description: 'Category nomi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'something.png', description: 'Category uchun rasm' })
  @IsString()
  icon: string;
}
