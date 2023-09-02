import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { AppController } from "./app.controller"
import { ChattingModule } from "./chatting/chatting.module"
import { Env } from "./core/const"
import { SocketModule } from "./core/socket"

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${Env.mongo.host}:${Env.mongo.port}`, {
      user: Env.mongo.user,
      pass: Env.mongo.password,
      dbName: Env.mongo.dbName
    }),
    SocketModule,
    ChattingModule
  ],
  controllers: [AppController]
})
export class AppModule {}
