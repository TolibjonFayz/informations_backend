import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Blog } from '../../blog/model/blog.model';

interface PictureAtr {
  img_url: string;
  blog_id: number;
}

@Table({ tableName: 'picture' })
export class Picture extends Model<Picture, PictureAtr> {
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

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  img_url: string;
}
