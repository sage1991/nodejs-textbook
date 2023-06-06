import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  HasMany,
  AllowNull,
  Unique,
  PrimaryKey,
  AutoIncrement
} from "sequelize-typescript"

import { Comment } from "./Comment"

@Table({
  timestamps: false,
  underscored: true,
  modelName: "User",
  tableName: "users",
  paranoid: false,
  charset: "utf8",
  collate: "utf8_general_ci"
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(20))
  name: string

  @AllowNull(false)
  @Column(DataType.INTEGER.UNSIGNED)
  age: number

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  married: boolean

  @AllowNull(true)
  @Column(DataType.TEXT)
  comment: string

  @CreatedAt
  createdAt: Date

  @HasMany(() => Comment)
  comments: Comment[]
}
