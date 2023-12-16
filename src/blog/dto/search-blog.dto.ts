import { ApiProperty } from '@nestjs/swagger';

export class SearchBlogDto {
  @ApiProperty({ example: 'Chumoli', description: 'Qirirayotgan narsez' })
  text: string;
}
