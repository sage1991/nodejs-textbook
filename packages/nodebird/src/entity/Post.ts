import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm"

import { User } from "./User"
import { HashTag } from "./HashTag"

@Entity({ name: "posts" })
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: "content", length: 140 })
  content: string

  @Column({ name: "image", length: 200, nullable: true })
  image: string

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @ManyToOne(() => User, (user) => user.posts)
  user: Promise<User>

  @ManyToMany(() => HashTag, (hashtag) => hashtag.posts)
  @JoinTable({
    name: "post_hashtag",
    joinColumn: { name: "post_id" },
    inverseJoinColumn: { name: "hashtag_id" }
  })
  hashtags: Promise<HashTag[]>
}
