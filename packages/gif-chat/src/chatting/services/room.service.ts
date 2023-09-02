import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { type IncomingMessage } from "http"
import { Model } from "mongoose"

import { WebSocketNamespace } from "../../core/const"
import { SocketGateway } from "../../core/socket"
import { type CreateRoomRequest } from "../models"
import { Room } from "../schemas"

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private readonly model: Model<Room>,
    private readonly gateway: SocketGateway
  ) {}

  create(session: IncomingMessage["session"], request: CreateRoomRequest) {
    return this.model.create({
      ...request,
      owner: session.color
    })
  }

  async renderChat(session: IncomingMessage["session"], id: string, password?: string) {
    const room = await this.model.findById(id).exec()
    if (!room) {
      throw new NotFoundException("Room not found")
    }

    if (room.password && room.password !== password) {
      throw new BadRequestException("Wrong password")
    }

    const sockets = await this.gateway
      .of(WebSocketNamespace.chat)
      .in(room._id.toString())
      .fetchSockets()

    if (room.max <= sockets.length) {
      throw new BadRequestException("Wrong password")
    }

    return {
      title: room.title,
      chats: [],
      user: session.color,
      room
    }
  }

  deleteRoomById(id: string) {
    return this.model.findByIdAndDelete(id).exec()
  }
}
