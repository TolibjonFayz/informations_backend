import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CategoryAtr {
  name: string;
  icon: string;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryAtr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  icon: string;
}
