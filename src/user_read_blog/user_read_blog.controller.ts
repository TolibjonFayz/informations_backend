import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserReadBlogService } from './user_read_blog.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateURBlogDto } from './dto/create-user_read_blog.dto';
import { UpdateURBlogDto } from './dto/update-user_read_blog.dto';

@ApiTags('User read blog')
@Controller('user-read-blog')
export class UserReadBlogController {
  constructor(private readonly userReadBlogService: UserReadBlogService) {}

  //Create urblog
  @ApiOperation({ summary: 'Create user read blog' })
  @Post('create')
  async create(@Body() createURBlogDto: CreateURBlogDto) {
    return this.userReadBlogService.createURBlog(createURBlogDto);
  }

  //Get all urblogs
  @ApiOperation({ summary: 'Get all user read blogs' })
  @Get('all')
  async getAll() {
    return this.userReadBlogService.getAllURBlogs();
  }

  //Get urblog by id
  @ApiOperation({ summary: 'Get user read blog by id' })
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.userReadBlogService.getURBlogById(id);
  }

  //Get blogs by user_id
  @ApiOperation({ summary: 'Get blogs by category_id' })
  @Get('user/:id')
  async getByCategoryId(@Param('id') user_id: number) {
    return this.userReadBlogService.getURBlogByUserId(user_id);
  }

  //Update user read blog by id
  @ApiOperation({ summary: 'Update user read blog by id' })
  @Put('update/:id')
  async updateById(
    @Param('id') id: number,
    @Body() updateurblogDto: UpdateURBlogDto,
  ) {
    return this.userReadBlogService.updateURBlogByid(id, updateurblogDto);
  }

  //Delete user read blog by id
  @ApiOperation({ summary: 'Delete user read blog by id' })
  @Delete('delete/:id')
  async deleteById(@Param('id') id: number) {
    return this.userReadBlogService.deleteURBlogById(id);
  }
}
