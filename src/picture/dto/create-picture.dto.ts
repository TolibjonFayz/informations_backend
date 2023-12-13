import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePictureDto {
  @ApiProperty({
    example: 'something.png',
    description: 'Blog uchun rasm linki',
  })
  @IsString()
  @IsNotEmpty()
  img_url: string;

  @ApiProperty({ example: 1, description: 'Blog id' })
  @IsNumber()
  @IsNotEmpty()
  blog_id: number;
}
