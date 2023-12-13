import { Module } from '@nestjs/common';
import { UserReadBlogService } from './user_read_blog.service';
import { UserReadBlogController } from './user_read_blog.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { URBlog } from './models/user_read_blog.model';

@Module({
  imports: [SequelizeModule.forFeature([URBlog])],
  controllers: [UserReadBlogController],
  providers: [UserReadBlogService],
  exports: [UserReadBlogService],
})
export class UserReadBlogModule {}
