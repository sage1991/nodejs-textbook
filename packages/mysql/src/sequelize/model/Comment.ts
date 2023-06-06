import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"

import { User } from "./User"

@Table({
  timestamps: false,
  underscored: true,
  modelName: "Comment",
  tableName: "comments",
  paranoid: false,
  charset: "utf8",
  collate: "utf8_general_ci"
})
export class Comment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  commenter: number

  @AllowNull(false)
  @Column(DataType.STRING(100))
  comment: string

  @CreatedAt
  createdAt: Date

  @BelongsTo(() => User)
  user: User
}
