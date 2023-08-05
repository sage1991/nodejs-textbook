import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm"

import { PostEntity } from "./PostEntity"

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: "email", type: "varchar", length: 40, unique: true, nullable: true })
  email: string

  @Column({ name: "nickname", type: "varchar", length: 15 })
  nickname: string

  @Column({ name: "password", type: "varchar", length: 100, nullable: true })
  password: string

  @Column({ name: "provider", type: "varchar", length: 10, default: "local" })
  provider: "local" | "kakao"

  @Column({ name: "sns_id", type: "varchar", length: 30, nullable: true })
  snsId: string

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: Promise<PostEntity[]>

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: "follows",
    joinColumn: { name: "follower_id" },
    inverseJoinColumn: { name: "following_id" }
  })
  followings: Promise<UserEntity[]>

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: "follows",
    joinColumn: { name: "following_id" },
    inverseJoinColumn: { name: "follower_id" }
  })
  followers: Promise<UserEntity[]>
}
