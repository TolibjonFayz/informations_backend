import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'Great blog', description: 'Blog uchun komment' })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({ example: 1, description: 'Blog id' })
  @IsNumber()
  @IsNotEmpty()
  blog_id: number;

  @ApiProperty({ example: 1, description: 'User id' })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: 1, description: 'Comment id' })
  comment_id: number;
}
