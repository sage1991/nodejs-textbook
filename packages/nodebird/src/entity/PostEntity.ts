import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm"

import { HashTagEntity } from "./HashTagEntity"
import { UserEntity } from "./UserEntity"

@Entity({ name: "posts" })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: "content", type: "varchar", length: 140 })
  content: string

  @Column({ name: "image", type: "varchar", length: 200, nullable: true })
  image: string

  @Column({ name: "commenter" })
  commenter: number

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: "commenter" })
  user: Promise<UserEntity>

  @ManyToMany(() => HashTagEntity, (hashtag) => hashtag.posts)
  @JoinTable({
    name: "post_hashtag",
    joinColumn: { name: "post_id" },
    inverseJoinColumn: { name: "hashtag_id" }
  })
  hashtags: Promise<HashTagEntity[]>
}
