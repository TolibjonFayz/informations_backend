import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private CommentRepository: typeof Comment,
  ) {}
  //Create Comment
  async createComment(createCommentDto: CreateCommentDto) {
    const creating = await this.CommentRepository.create({
      ...createCommentDto,
    });
    const response = {
      message: 'Comments successfully created',
      creating,
    };
    return response;
  }

  //Get all comments
  async getAllComments() {
    const comments = await this.CommentRepository.findAll({
      include: { all: true },
    });
    if (!comments.length) {
      throw new NotFoundException('Any comment not found');
    }
    return comments;
  }

  //Get comment by id
  async getCommentById(id: number) {
    const comment = await this.CommentRepository.findOne({
      where: { id: id },
      include: { all: true },
    });
    if (!comment) {
      throw new NotFoundException('Comment not found at this id');
    }
    return comment;
  }

  //Get blogs by blog_id
  async getCommentByBlogId(blog_id: number) {
    const comments = await this.CommentRepository.findAll({
      where: { blog_id: blog_id },
      include: { all: true },
    });
    if (!comments.length) {
      throw new NotFoundException('Comments not found at this blog_id');
    }
    return comments;
  }

  //Update comment by id
  async updateCommentByid(id: number, updateCommnetDto: UpdateCommentDto) {
    const comment = await this.CommentRepository.findByPk(id);
    if (comment) {
      const updating = await this.CommentRepository.update(updateCommnetDto, {
        where: { id: id },
        returning: true,
      });
      return updating[1][0].dataValues;
    }
    throw new BadRequestException('Comment not found or smt wrong');
  }

  //Delete comment by id
  async deleteCommentById(id: number) {
    const find = await this.CommentRepository.findOne({ where: { id: id } });
    if (!find) throw new NotFoundException('Comment not found at this id');
    const deleting = await this.CommentRepository.destroy({
      where: { id: id },
    });
    return deleting;
  }
}
