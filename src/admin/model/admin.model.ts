import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AdminAtr {
  first_name: String;
  last_name: String;
  username: String;
  phone_number: String;
  email: String;
  password: String;
  refresh_token: String;
  unique_id: String;
  is_active: Boolean;
  is_creator: Boolean;
}

@Table({ tableName: 'Admin' })
export class Admin extends Model<Admin, AdminAtr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  unique_id: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  is_creator: boolean;
}
