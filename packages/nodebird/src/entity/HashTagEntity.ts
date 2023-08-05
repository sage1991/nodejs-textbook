import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm"

import { PostEntity } from "./PostEntity"

@Entity({ name: "hashtags" })
export class HashTagEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    name: "title",
    type: "varchar",
    length: 15,
    nullable: false,
    unique: true
  })
  title: string

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @ManyToMany(() => PostEntity, (post) => post.hashtags)
  @JoinTable({
    name: "post_hashtag",
    joinColumn: { name: "hashtag_id" },
    inverseJoinColumn: { name: "post_id" }
  })
  posts: Promise<PostEntity[]>
}
