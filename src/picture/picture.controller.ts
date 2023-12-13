import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PictureService } from './picture.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';

@ApiTags('Picture')
@Controller('picture')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  //Create Comment
  @ApiOperation({ summary: 'Create picture' })
  @Post('create')
  async create(@Body() createPictureDto: CreatePictureDto) {
    return this.pictureService.createPicture(createPictureDto);
  }

  //Get all pictures
  @ApiOperation({ summary: 'Get all pictures' })
  @Get('all')
  async getAll() {
    return this.pictureService.getAllPictures();
  }

  //Get picture by id
  @ApiOperation({ summary: 'Get picture by id' })
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.pictureService.getPictureById(id);
  }

  //Get picture by blog_id
  @ApiOperation({ summary: 'Get pictures by blog_id' })
  @Get('blog/:id')
  async getByBlogId(@Param('id') blog_id: number) {
    return this.pictureService.getPictureByBlogId(blog_id);
  }

  //Update picture by id
  @ApiOperation({ summary: 'Update picture by id' })
  @Put('update/:id')
  async updateById(
    @Param('id') id: number,
    @Body() updatePictureDto: UpdatePictureDto,
  ) {
    return this.pictureService.updatepictureByid(id, updatePictureDto);
  }

  //Delete picture by id
  @ApiOperation({ summary: 'Delete picture by id' })
  @Delete('delete/:id')
  async deleteById(@Param('id') id: number) {
    return this.pictureService.deletePictureById(id);
  }
}
