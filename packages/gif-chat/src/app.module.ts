import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { AppController } from "./app.controller"
import { ChatModule } from "./chat/chat.module"
import { Env } from "./core/const"
import { RoomModule } from "./room/room.module"

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${Env.mongo.host}:${Env.mongo.port}`, {
      user: Env.mongo.user,
      pass: Env.mongo.password,
      dbName: Env.mongo.dbName
    }),
    ChatModule,
    RoomModule
  ],
  controllers: [AppController]
})
export class AppModule {}
