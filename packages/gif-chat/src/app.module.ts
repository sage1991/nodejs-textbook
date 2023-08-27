import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { ChatModule } from "./chat/chat.module"
import { Env } from "./core/const"

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${Env.mongo.host}:${Env.mongo.port}`, {
      user: Env.mongo.user,
      pass: Env.mongo.password,
      dbName: Env.mongo.dbName
    }),
    ChatModule
  ]
})
export class AppModule {}
