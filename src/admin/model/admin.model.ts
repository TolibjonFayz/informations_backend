import { ApiProperty } from '@nestjs/swagger';
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

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAtr> {
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
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({ example: '+998901234567', description: 'Raqam' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @ApiProperty({ example: 'Falonchioff@gmail.com', description: 'Email' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: 'qwerty', description: 'Parol' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  refresh_token: string;

  @ApiProperty({
    example: 'sdlak',
    description: 'Adminni activ qilish uchun ishlatiladigan id',
  })
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
