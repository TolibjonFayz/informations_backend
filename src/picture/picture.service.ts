import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { Picture } from './models/picture.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PictureService {
  constructor(
    @InjectModel(Picture) private PictureRepository: typeof Picture,
  ) {}

  //Create Picture
  async createPicture(createPictureDto: CreatePictureDto) {
    const creating = await this.PictureRepository.create({
      ...createPictureDto,
    });
    const response = {
      message: 'Picture successfully created',
      creating,
    };
    return response;
  }

  //Get all comments
  async getAllPictures() {
    const pictures = await this.PictureRepository.findAll({
      include: { all: true },
    });
    if (!pictures.length) {
      throw new NotFoundException('Any pictures not found');
    }
    return pictures;
  }

  //Get picture by id
  async getPictureById(id: number) {
    const picture = await this.PictureRepository.findOne({
      where: { id: id },
      include: { all: true },
    });
    if (!picture) {
      throw new NotFoundException('Picture not found at this id');
    }
    return picture;
  }

  //Get pictures by blog_id
  async getPictureByBlogId(blog_id: number) {
    const pictures = await this.PictureRepository.findAll({
      where: { blog_id: blog_id },
      include: { all: true },
    });
    if (!pictures.length) {
      throw new NotFoundException('Pictures not found at this blog_id');
    }
    return pictures;
  }

  //Update picture by id
  async updatepictureByid(id: number, updatePictureDto: UpdatePictureDto) {
    const picture = await this.PictureRepository.findByPk(id);
    if (picture) {
      const updating = await this.PictureRepository.update(updatePictureDto, {
        where: { id: id },
        returning: true,
      });
      return updating[1][0].dataValues;
    }
    throw new BadRequestException('Picture not found or smt wrong');
  }

  //Delete picture by id
  async deletePictureById(id: number) {
    const find = await this.PictureRepository.findOne({ where: { id: id } });
    if (!find) throw new NotFoundException('Picture not found at this id');
    const deleting = await this.PictureRepository.destroy({
      where: { id: id },
    });
    return deleting;
  }
}
