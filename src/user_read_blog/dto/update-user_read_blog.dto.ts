import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateURBlogDto {
  @ApiProperty({ example: 1, description: 'Blog id' })
  @IsNumber()
  @IsNotEmpty()
  blog_id: number;

  @ApiProperty({ example: 1, description: 'User id' })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
