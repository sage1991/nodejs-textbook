import {
  ConnectedSocket,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets"
import { Namespace, type Socket } from "socket.io"

import { Env, WebSocketNamespace } from "../../core/const"
import { RoomService } from "../services"

@WebSocketGateway(Env.webSocketPort, {
  namespace: WebSocketNamespace.room,
  transports: ["websocket"]
})
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public readonly namespace: Namespace

  constructor(private readonly service: RoomService) {}

  handleConnection(client: Socket) {}

  handleDisconnect(client: Socket) {}

  @SubscribeMessage("message")
  handleMessage(@ConnectedSocket() client: Socket): string {
    return "Hello world!"
  }
}
