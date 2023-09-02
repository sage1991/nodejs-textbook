import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type HydratedDocument } from "mongoose"

@Schema()
export class Room {
  @Prop({ required: true })
  title: string

  @Prop({ required: true, default: 10, min: 2 })
  max: number

  @Prop({ required: true })
  owner: string

  password: string

  @Prop({ default: Date.now })
  createdAt: Date
}

export type RoomDocument = HydratedDocument<Room>

export const RoomSchema = SchemaFactory.createForClass(Room)
