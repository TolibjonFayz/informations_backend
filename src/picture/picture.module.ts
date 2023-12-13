import { Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Picture } from './models/picture.model';

@Module({
  imports: [SequelizeModule.forFeature([Picture])],
  controllers: [PictureController],
  providers: [PictureService],
  exports: [PictureService],
})
export class PictureModule {}
