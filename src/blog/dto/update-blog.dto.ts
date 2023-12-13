import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBlogDto {
  @ApiProperty({ example: 'Rabbit', description: 'Blog nomi' })
  title: string;

  @ApiProperty({ example: 'Matn', description: 'Blog matni' })
  body: string;

  @ApiProperty({ example: 'Islom.uz', description: 'Blog manbasi' })
  source: string;

  @ApiProperty({ example: 1, description: 'Blog ko`rishlar soni' })
  views: number;

  @ApiProperty({ example: 1, description: 'Blog Categoy id' })
  category_id: number;
}
