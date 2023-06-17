import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"

import { User } from "./User"

@Entity({ name: "follows" })
export class Follow {
  @PrimaryColumn({ name: "follower_id", type: "int" })
  followerId: number

  @PrimaryColumn({ name: "following_id", type: "int" })
  followingId: number

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @ManyToOne(() => User)
  @JoinColumn({ name: "follower_id" })
  follower: Promise<User>

  @ManyToOne(() => User)
  @JoinColumn({ name: "following_id" })
  following: Promise<User>
}
