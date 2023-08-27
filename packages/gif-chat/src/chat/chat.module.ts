import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { ChatGateway, RoomGateway } from "./gateways"
import { Chat, ChatSchema, Room, RoomSchema } from "./schemas"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Room.name, schema: RoomSchema }
    ])
  ],
  providers: [ChatGateway, RoomGateway]
})
export class ChatModule {}
