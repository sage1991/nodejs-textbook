import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { Comment } from "./Comment"

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "varchar",
    length: 20
  })
  @Index("name_unique_index", { unique: true })
  name: string

  @Column({
    type: "int",
    unsigned: true
  })
  age: number

  @Column({
    type: "boolean"
  })
  married: boolean

  @Column({ type: "text", nullable: true })
  comment: string

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Promise<Comment[]>
}
