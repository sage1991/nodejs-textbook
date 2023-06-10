import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm"
import { User } from "./User"

@Entity({ name: "comments" })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "int" })
  @Index("commenter_index", { unique: false })
  commenter: number

  @Column({
    type: "varchar",
    length: 100
  })
  comment: string

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @ManyToOne((type) => User, { eager: true })
  @JoinColumn({ name: "commenter", referencedColumnName: "id" })
  user: User
}
