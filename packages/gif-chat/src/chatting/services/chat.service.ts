import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { Chat } from "../schemas"

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private readonly model: Model<Chat>) {}

  deleteManyByRoomId(roomId: string): Promise<{ deletedCount: number }> {
    return this.model.deleteMany({ room: roomId }).exec()
  }
}
