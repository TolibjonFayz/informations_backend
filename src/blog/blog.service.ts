import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Blog } from './model/blog.model';
import Sequelize from 'sequelize';
import { SearchByQueryBlogDto } from './dto/search-query-blog.dto';
const { Op } = Sequelize;

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog) private BlogRepository: typeof Blog) {}

  //Create Blog
  async createBlog(createBlogDto: CreateBlogDto) {
    const creating = await this.BlogRepository.create({
      ...createBlogDto,
    });
    const response = {
      message: 'Blog successfully created',
      creating,
    };
    return response;
  }

  //Get all blogs
  async getAllBlogs() {
    const blogs = await this.BlogRepository.findAll({ include: { all: true } });
    if (!blogs.length) {
      throw new NotFoundException('Any blog not found');
    }
    return blogs;
  }

  //Search  blogs
  async searchBlogs(text: string) {
    const blogs = await this.BlogRepository.findAll({
      where: {
        title: {
          [Op.like]: `%${text}%`,
        },
      },
      include: { all: true },
    });
    return blogs;
  }

  //Search  blogs
  async searchByQueryBlog(searchByQueryBlogDto: SearchByQueryBlogDto) {
    const blogs = await this.BlogRepository.findAll({
      where: {
        title: {
          [Op.like]: `%${searchByQueryBlogDto.title}%`,
        },
        category_id: searchByQueryBlogDto.category_id,
      },
      include: { all: true },
    });
    return blogs;
  }

  //Get blog by id
  async getBlogById(id: number) {
    const blog = await this.BlogRepository.findOne({
      where: { id: id },
      include: { all: true },
    });
    if (!blog) {
      throw new NotFoundException('Blog not found at this id');
    }
    return blog;
  }

  //Get blogs by category_id
  async getBlogCategoryById(category_id: number) {
    const blogs = await this.BlogRepository.findAll({
      where: { category_id: category_id },
      include: { all: true },
    });
    if (!blogs.length) {
      throw new NotFoundException('Blogs not found at this category_id');
    }
    return blogs;
  }

  //Update blog by id
  async updateBlogByid(id: number, updateBlogDto: UpdateBlogDto) {
    const blog = await this.BlogRepository.findByPk(id);
    if (blog) {
      const updating = await this.BlogRepository.update(updateBlogDto, {
        where: { id: id },
        returning: true,
      });
      return updating[1][0].dataValues;
    }
    throw new BadRequestException('Blog not found or smt wrong');
  }

  //Delete blog by id
  async deleteBlogById(id: number) {
    const find = await this.BlogRepository.findOne({ where: { id: id } });
    if (!find) throw new NotFoundException('Blog not found at this id');
    const deleting = await this.BlogRepository.destroy({
      where: { id: id },
    });
    return deleting;
  }
}
