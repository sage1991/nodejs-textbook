import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm"

import { Post } from "./Post"

@Entity({ name: "hashtags" })
export class HashTag {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    name: "title",
    type: "string",
    length: 15,
    nullable: false,
    unique: true
  })
  title: string

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @ManyToMany(() => Post, (post) => post.hashtags)
  @JoinTable({
    name: "post_hashtag",
    joinColumn: { name: "hashtag_id" },
    inverseJoinColumn: { name: "post_id" }
  })
  posts: Promise<Post[]>
}
