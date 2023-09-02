import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Render,
  Session,
  UseFilters
} from "@nestjs/common"
import { type IncomingMessage } from "http"

import { RenderExceptionFilter } from "../../core/filters"
import { CreateRoomRequest } from "../models"
import { ChatService, RoomService } from "../services"

@Controller("room")
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly chatService: ChatService
  ) {}

  @Get()
  @Render("room.html")
  @UseFilters(RenderExceptionFilter)
  renderRoom() {
    return { title: "GIF 채팅방" }
  }

  @Post()
  @Redirect()
  async create(@Session() session: IncomingMessage["session"], @Body() request: CreateRoomRequest) {
    const { _id, password } = await this.roomService.create(session, request)
    return { url: `/room/${_id.toString()}?password=${password}` }
  }

  @Get(":id")
  @Render("chat.html")
  @UseFilters(RenderExceptionFilter)
  renderChat(
    @Session() session: IncomingMessage["session"],
    @Param("id") id: string,
    @Query("password") password?: string
  ) {
    return this.roomService.renderChat(session, id, password)
  }
}
