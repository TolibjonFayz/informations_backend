import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Blog } from '../../blog/model/blog.model';
import { User } from '../../user/model/user.model';

interface SBlogsAtr {
  blog_id: number;
  user_id: number;
}

@Table({ tableName: 'sblog' })
export class SBlog extends Model<SBlog, SBlogsAtr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Blog)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  blog_id: number;
  @BelongsTo(() => Blog)
  blog: Blog;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;
  @BelongsTo(() => User)
  user: User;
}
