import { Controller, Get, Render } from "@nestjs/common"

@Controller()
export class AppController {
  @Get("/")
  @Render("main.html")
  root() {
    return { title: "GIF 채팅방", rooms: [] }
  }
}
