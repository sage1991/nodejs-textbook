import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { RoomController } from "./controllers"
import { ChatGateway, RoomGateway } from "./gateways"
import { Chat, ChatSchema, Room, RoomSchema } from "./schemas"
import { ChatService, RoomService } from "./services"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Room.name, schema: RoomSchema }
    ])
  ],
  controllers: [RoomController],
  providers: [RoomService, RoomGateway, ChatGateway, ChatService]
})
export class ChattingModule {}
