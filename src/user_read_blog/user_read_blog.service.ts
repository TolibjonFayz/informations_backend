import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { URBlog } from './models/user_read_blog.model';
import { CreateURBlogDto } from './dto/create-user_read_blog.dto';
import { UpdateURBlogDto } from './dto/update-user_read_blog.dto';

@Injectable()
export class UserReadBlogService {
  constructor(@InjectModel(URBlog) private URBlogRepository: typeof URBlog) {}

  //Create Blog
  async createURBlog(createURBlogDto: CreateURBlogDto) {
    //checking
    const isexists = await this.URBlogRepository.findOne({
      where: {
        user_id: createURBlogDto.user_id,
        blog_id: createURBlogDto.blog_id,
      },
    });
    if (isexists) {
      throw new BadRequestException('Sorry, already readed');
    }

    const creating = await this.URBlogRepository.create({
      ...createURBlogDto,
    });
    const response = {
      message: 'User Read Blog successfully created',
      creating,
    };
    return response;
  }

  //Get all URblogs
  async getAllURBlogs() {
    const urblogs = await this.URBlogRepository.findAll({
      include: { all: true },
    });
    if (!urblogs.length) {
      throw new NotFoundException('Any user read blog not found');
    }
    return urblogs;
  }

  //Get urblog by id
  async getURBlogById(id: number) {
    const urblog = await this.URBlogRepository.findOne({
      where: { id: id },
      include: { all: true },
    });
    if (!urblog) {
      throw new NotFoundException('User read blog not found at this id');
    }
    return urblog;
  }

  //Get blogs by user_id
  async getURBlogByUserId(user_id: number) {
    const urblogs = await this.URBlogRepository.findAll({
      where: { user_id: user_id },
      include: { all: true },
    });
    if (!urblogs.length) {
      throw new NotFoundException('User Read Blogs not found at this user_id');
    }
    return urblogs;
  }

  //Update urblog by id
  async updateURBlogByid(id: number, updateURBlogDto: UpdateURBlogDto) {
    const urblog = await this.URBlogRepository.findByPk(id);
    if (urblog) {
      const updating = await this.URBlogRepository.update(updateURBlogDto, {
        where: { id: id },
        returning: true,
      });
      return updating[1][0].dataValues;
    }
    throw new BadRequestException('Blog not found or smt wrong');
  }

  //Delete urblog by id
  async deleteURBlogById(id: number) {
    const find = await this.URBlogRepository.findOne({ where: { id: id } });
    if (!find)
      throw new NotFoundException('User Read Blog not found at this id');
    const deleting = await this.URBlogRepository.destroy({
      where: { id: id },
    });
    return deleting;
  }
}
