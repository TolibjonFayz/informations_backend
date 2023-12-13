import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  //Create category
  @ApiOperation({ summary: 'Create category' })
  @Post('create')
  async create(@Body() createTypeDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createTypeDto);
  }

  //Get all categories
  @ApiOperation({ summary: 'Get all categories' })
  @Get('all')
  async getAll() {
    return this.categoryService.getAllCategories();
  }

  //Get category by id
  @ApiOperation({ summary: 'Get category by id' })
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.categoryService.getCategoryById(id);
  }

  //Update category by id
  @ApiOperation({ summary: 'Update category by id' })
  @Put('update/:id')
  async updateById(
    @Param('id') id: number,
    @Body() updatecategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategoryByid(id, updatecategoryDto);
  }

  //Delete category by id
  @ApiOperation({ summary: 'Delete category by id' })
  @Delete('delete/:id')
  async deleteById(@Param('id') id: number) {
    return this.categoryService.deleteCategoryById(id);
  }
}
