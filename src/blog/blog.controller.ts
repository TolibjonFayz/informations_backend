import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchBlogDto } from './dto/search-blog.dto';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  //Create blog
  @ApiOperation({ summary: 'Create blog' })
  @Post('create')
  async create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.createBlog(createBlogDto);
  }

  //Search blog
  @ApiOperation({ summary: 'Search blog' })
  @Post('search')
  async search(@Body() searchBlogDto: SearchBlogDto) {
    return this.blogService.searchBlogs(searchBlogDto.text);
  }

  //Get all blogs
  @ApiOperation({ summary: 'Get all blogs' })
  @Get('all')
  async getAll() {
    return this.blogService.getAllBlogs();
  }

  //Get blog by id
  @ApiOperation({ summary: 'Get blog by id' })
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.blogService.getBlogById(id);
  }

  //Get blogs by category_id
  @ApiOperation({ summary: 'Get blogs by category_id' })
  @Get('category/:id')
  async getByCategoryId(@Param('id') category_id: number) {
    return this.blogService.getBlogCategoryById(category_id);
  }

  //Update blog by id
  @ApiOperation({ summary: 'Update blog by id' })
  @Put('update/:id')
  async updateById(
    @Param('id') id: number,
    @Body() updateblogDto: UpdateBlogDto,
  ) {
    return this.blogService.updateBlogByid(id, updateblogDto);
  }

  //Delete blog by id
  @ApiOperation({ summary: 'Delete blog by id' })
  @Delete('delete/:id')
  async deleteById(@Param('id') id: number) {
    return this.blogService.deleteBlogById(id);
  }
}
