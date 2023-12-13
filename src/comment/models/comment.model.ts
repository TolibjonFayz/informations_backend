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

interface CommentAtr {
  blog_id: number;
  user_id: number;
  comment: string;
  comment_id: number;
}

@Table({ tableName: 'comment' })
export class Comment extends Model<Comment, CommentAtr> {
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

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  comment: string;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
  })
  comment_id: number;
  @BelongsTo(() => Comment)
  father_comment: Comment;
}
