import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"

import { HashTagEntity } from "./HashTagEntity"
import { PostEntity } from "./PostEntity"

@Entity({ name: "post_hashtag" })
export class PostHashTagEntity {
  @PrimaryColumn({ name: "post_id", type: "int" })
  postId: number

  @PrimaryColumn({ name: "hashtag_id", type: "int" })
  hashtagId: number

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @ManyToOne(() => PostEntity)
  @JoinColumn({ name: "post_id" })
  post: Promise<PostEntity>

  @ManyToOne(() => HashTagEntity)
  @JoinColumn({ name: "hashtag_id" })
  hashtag: Promise<HashTagEntity>
}
