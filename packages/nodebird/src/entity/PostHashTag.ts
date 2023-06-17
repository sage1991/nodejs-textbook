import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"

import { Post } from "./Post"
import { HashTag } from "./HashTag"

@Entity({ name: "post_hashtag" })
export class PostHashTag {
  @PrimaryColumn({ name: "post_id", type: "int" })
  postId: number

  @PrimaryColumn({ name: "hashtag_id", type: "int" })
  hashtagId: number

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @ManyToOne(() => Post)
  @JoinColumn({ name: "post_id" })
  post: Promise<Post>

  @ManyToOne(() => HashTag)
  @JoinColumn({ name: "hashtag_id" })
  hashtag: Promise<HashTag>
}
