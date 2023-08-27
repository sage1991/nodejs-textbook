import {
  ConnectedSocket,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets"
import { type Server, type Socket } from "socket.io"

import { Env } from "../../core/const"

@WebSocketGateway(Env.webSocketPort, { namespace: "room", transports: ["websocket"] })
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server

  handleConnection(client: Socket) {
    console.log("room namespace 에 접속")
  }

  handleDisconnect(client: Socket) {
    console.log("room namespace 에 접속 해제")
  }

  @SubscribeMessage("message")
  handleMessage(@ConnectedSocket() client: Socket): string {
    return "Hello world!"
  }
}
