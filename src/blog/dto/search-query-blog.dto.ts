import { ApiProperty } from '@nestjs/swagger';

export class SearchByQueryBlogDto {
  @ApiProperty({ example: 'Chumoli', description: 'Qirirayotgan narsez' })
  title: string;

  @ApiProperty({
    example: 2,
    description: 'Qirirayotgan narsez qaysi ketegoryga oid bo`lsin',
  })
  category_id: number;
}
