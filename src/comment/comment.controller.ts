import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  //Create Comment
  @ApiOperation({ summary: 'Create comment' })
  @Post('create')
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  //Get all comment
  @ApiOperation({ summary: 'Get all comments' })
  @Get('all')
  async getAll() {
    return this.commentService.getAllComments();
  }

  //Get comment by id
  @ApiOperation({ summary: 'Get comment by id' })
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.commentService.getCommentById(id);
  }

  //Get comment by blog_id
  @ApiOperation({ summary: 'Get blogs by category_id' })
  @Get('blog/:id')
  async getByCategoryId(@Param('id') blog_id: number) {
    return this.commentService.getCommentByBlogId(blog_id);
  }

  //Update comment by id
  @ApiOperation({ summary: 'Update blog by id' })
  @Put('update/:id')
  async updateById(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.updateCommentByid(id, updateCommentDto);
  }

  //Delete comment by id
  @ApiOperation({ summary: 'Delete comment by id' })
  @Delete('delete/:id')
  async deleteById(@Param('id') id: number) {
    return this.commentService.deleteCommentById(id);
  }
}
