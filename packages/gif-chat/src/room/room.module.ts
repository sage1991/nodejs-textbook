import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { RoomController } from "./controllers"
import { RoomGateway } from "./gateways"
import { Room, RoomSchema } from "./schemas"

@Module({
  imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])],
  providers: [RoomGateway],
  controllers: [RoomController]
})
export class RoomModule {}
