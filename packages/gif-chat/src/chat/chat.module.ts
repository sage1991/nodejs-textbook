import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { ChatGateway } from "./gateways"
import { Chat, ChatSchema } from "./schemas"

@Module({
  imports: [MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }])],
  providers: [ChatGateway]
})
export class ChatModule {}
