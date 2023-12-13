import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private CategoryRepository: typeof Category,
  ) {}

  //Create category
  async createCategory(createCategoryDto: CreateCategoryDto) {
    //Category is exists?
    const type = await this.CategoryRepository.findOne({
      where: { name: createCategoryDto.name },
    });
    if (type) throw new BadRequestException('Category alreadye exists');

    const creating = await this.CategoryRepository.create({
      ...createCategoryDto,
    });
    const response = {
      message: 'Category successfully created',
      creating,
    };
    return response;
  }

  //Get all categories
  async getAllCategories() {
    const categories = await this.CategoryRepository.findAll({});
    if (!categories.length) {
      throw new NotFoundException('Any category not found');
    }
    return categories;
  }

  //Get category by id
  async getCategoryById(id: number) {
    const category = await this.CategoryRepository.findOne({
      where: { id: id },
    });
    if (!category) {
      throw new NotFoundException('Category not found at this id');
    }
    return category;
  }

  //Update Category by id
  async updateCategoryByid(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.CategoryRepository.findByPk(id);
    if (category) {
      const updating = await this.CategoryRepository.update(updateCategoryDto, {
        where: { id: id },
        returning: true,
      });
      return updating[1][0].dataValues;
    }
    throw new BadRequestException('Category not found or smt wrong');
  }

  //Delete category by id
  async deleteCategoryById(id: number) {
    const find = await this.CategoryRepository.findOne({ where: { id: id } });
    if (!find) throw new NotFoundException('Category not found at this id');
    const deleting = await this.CategoryRepository.destroy({
      where: { id: id },
    });
    return deleting;
  }
}
