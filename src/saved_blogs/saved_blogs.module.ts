import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SBlog } from './models/saved_blogs.model';
import { SavedBlogController } from './saved_blogs.controller';
import { SavedBlogService } from './saved_blogs.service';

@Module({
  imports: [SequelizeModule.forFeature([SBlog])],
  controllers: [SavedBlogController],
  providers: [SavedBlogService],
  exports: [SavedBlogService],
})
export class SavedBlogsModule {}
