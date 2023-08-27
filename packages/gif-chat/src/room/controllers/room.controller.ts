import { Controller, Get, Render } from "@nestjs/common"

@Controller("room")
export class RoomController {
  @Get("/")
  @Render("room.html")
  root() {
    return { title: "GIF 채팅방" }
  }
}
