import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserAtr {
  first_name: String;
  last_name: String;
  username: String;
  refresh_token: String;
  email: String;
  password: String;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserAtr> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Falonchi', description: 'Ism' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Falonchiyev', description: 'Familiya' })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({ example: 'falonchioff', description: 'Username' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @ApiProperty({ example: 'falonchi@gmail.com', description: 'Username' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  refresh_token: string;

  @ApiProperty({ example: 'qweerty', description: 'Parol' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
