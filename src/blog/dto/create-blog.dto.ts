import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ example: 'Rabbit', description: 'Blog nomi' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Matn', description: 'Blog matni' })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({ example: 'Islom.uz', description: 'Blog manbasi' })
  @IsString()
  @IsNotEmpty()
  source: string;

  @ApiProperty({ example: 1, description: 'Blog ko`rishlar soni' })
  views: number;

  @ApiProperty({ example: 1, description: 'Blog Categoy id' })
  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}
