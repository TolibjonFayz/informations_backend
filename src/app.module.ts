import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { BlogModule } from './blog/blog.module';
import { UserReadBlogModule } from './user_read_blog/user_read_blog.module';
import { CommentModule } from './comment/comment.module';
import { PictureModule } from './picture/picture.module';
import { SavedBlogsModule } from './saved_blogs/saved_blogs.module';

// Import pg for potential SSL configuration
const pg = require('pg');

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // You might need to set this to true in production
        },
      },
      models: [],
      autoLoadModels: true,
      logging: false,
    }),
    AdminModule,
    UserModule,
    CategoryModule,
    BlogModule,
    UserReadBlogModule,
    CommentModule,
    PictureModule,
    SavedBlogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
