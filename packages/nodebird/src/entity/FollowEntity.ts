import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"

import { UserEntity } from "./UserEntity"

@Entity({ name: "follows" })
export class FollowEntity {
  @PrimaryColumn({ name: "follower_id", type: "int" })
  followerId: number

  @PrimaryColumn({ name: "following_id", type: "int" })
  followingId: number

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "follower_id" })
  follower: Promise<UserEntity>

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "following_id" })
  following: Promise<UserEntity>
}
