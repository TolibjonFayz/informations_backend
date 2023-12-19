import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SBlog } from './models/saved_blogs.model';
import { CreateSBlogDto } from './dto/create-saved_blog.dto';
import { UpdateSBlogDto } from './dto/update-saved_blog.dto';
import { Blog } from '../blog/model/blog.model';
import { Picture } from '../picture/models/picture.model';
import { Category } from '../category/models/category.model';

@Injectable()
export class SavedBlogService {
  constructor(@InjectModel(SBlog) private SBlogRepository: typeof SBlog) {}

  //Create Blog
  async createURBlog(createSBlogDto: CreateSBlogDto) {
    //checking
    const isexists = await this.SBlogRepository.findOne({
      where: {
        user_id: createSBlogDto.user_id,
        blog_id: createSBlogDto.blog_id,
      },
    });
    if (isexists) {
      throw new BadRequestException('Sorry, already readed');
    }

    const creating = await this.SBlogRepository.create({
      ...createSBlogDto,
    });
    const response = {
      message: 'Saved Blog successfully created',
      creating,
    };
    return response;
  }

  //Get all sblogs
  async getAllURBlogs() {
    const urblogs = await this.SBlogRepository.findAll({
      include: { all: true },
    });
    if (!urblogs.length) {
      throw new NotFoundException('Any saved blog not found');
    }
    return urblogs;
  }

  //Get sblog by id
  async getURBlogById(id: number) {
    const urblog = await this.SBlogRepository.findOne({
      where: { id: id },
      include: { all: true },
    });
    if (!urblog) {
      throw new NotFoundException('User saved not found at this id');
    }
    return urblog;
  }

  //Get sblogs by user_id
  async getURBlogByUserId(user_id: number) {
    const urblogs = await this.SBlogRepository.findAll({
      where: { user_id: user_id },
      include: [
        {
          model: Blog,
          include: [{ model: Picture }],
        },
        {
          model: Blog,
          include: [{ model: Category }],
        },
      ],
    });
    if (!urblogs.length) {
      throw new NotFoundException('User Read Blogs not found at this user_id');
    }
    return urblogs;
  }

  //Update sblog by id
  async updateURBlogByid(id: number, updateSBlogDto: UpdateSBlogDto) {
    const urblog = await this.SBlogRepository.findByPk(id);
    if (urblog) {
      const updating = await this.SBlogRepository.update(updateSBlogDto, {
        where: { id: id },
        returning: true,
      });
      return updating[1][0].dataValues;
    }
    throw new BadRequestException('Blog not found or smt wrong');
  }

  //Delete urblog by id
  async deleteURBlogById(id: number) {
    const find = await this.SBlogRepository.findOne({ where: { id: id } });
    if (!find)
      throw new NotFoundException('User Read Blog not found at this id');
    const deleting = await this.SBlogRepository.destroy({
      where: { id: id },
    });
    return deleting;
  }
}
