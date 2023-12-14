import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SavedBlogService } from './saved_blogs.service';
import { CreateSBlogDto } from './dto/create-saved_blog.dto';
import { UpdateSBlogDto } from './dto/update-saved_blog.dto';

@ApiTags('Saved blogs')
@Controller('saved-blog')
export class SavedBlogController {
  constructor(private readonly savedBlogService: SavedBlogService) {}

  //Create urblog
  @ApiOperation({ summary: 'Create saved blog' })
  @Post('create')
  async create(@Body() createURBlogDto: CreateSBlogDto) {
    return this.savedBlogService.createURBlog(createURBlogDto);
  }

  //Get all sblogs
  @ApiOperation({ summary: 'Get all saved blogs' })
  @Get('all')
  async getAll() {
    return this.savedBlogService.getAllURBlogs();
  }

  //Get urblog by id
  @ApiOperation({ summary: 'Get saved blog by id' })
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.savedBlogService.getURBlogById(id);
  }

  //Get blogs by user_id
  @ApiOperation({ summary: 'Get saved blogs by user_id' })
  @Get('user/:id')
  async getByCategoryId(@Param('id') user_id: number) {
    return this.savedBlogService.getURBlogByUserId(user_id);
  }

  //Update user read blog by id
  @ApiOperation({ summary: 'Update saved blog by id' })
  @Put('update/:id')
  async updateById(
    @Param('id') id: number,
    @Body() updateurblogDto: UpdateSBlogDto,
  ) {
    return this.savedBlogService.updateURBlogByid(id, updateurblogDto);
  }

  //Delete user read blog by id
  @ApiOperation({ summary: 'Delete saved blog by id' })
  @Delete('delete/:id')
  async deleteById(@Param('id') id: number) {
    return this.savedBlogService.deleteURBlogById(id);
  }
}
