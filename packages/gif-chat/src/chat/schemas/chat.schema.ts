import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { type HydratedDocument } from "mongoose"

import { Room } from "./room.schema"

@Schema()
export class Chat {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Room" })
  room: Room

  @Prop({ required: true })
  user: string

  @Prop()
  chat: string

  @Prop()
  gif: string

  @Prop({ default: Date.now })
  createdAt: Date
}

export type ChatDocument = HydratedDocument<Chat>

export const ChatSchema = SchemaFactory.createForClass(Chat)
