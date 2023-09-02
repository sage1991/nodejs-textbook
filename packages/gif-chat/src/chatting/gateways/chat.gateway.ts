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
import { ChatService, RoomService } from "../services"

@WebSocketGateway(Env.webSocketPort, {
  namespace: WebSocketNamespace.chat,
  transports: ["websocket"]
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public readonly namespace: Namespace

  constructor(
    private readonly chatService: ChatService,
    private readonly roomService: RoomService
  ) {}

  handleConnection(client: Socket, ...rest: any) {
    const { session } = client.request
    const { id } = client.handshake.query as { id: string }

    client.join(id)
    client.to(id).emit("join", {
      user: "system",
      chat: `${session.color}님이 입장 하셨습니다.`
    })
  }

  async handleDisconnect(client: Socket) {
    const { session } = client.request
    const { id } = client.handshake.query as { id: string }
    console.log("id", id)

    client.leave(id)

    const sockets = await client.in(id).fetchSockets()
    if (sockets.length === 0) {
      await Promise.all([
        this.roomService.deleteRoomById(id),
        this.chatService.deleteManyByRoomId(id)
      ])
      this.namespace.server.of(WebSocketNamespace.room).emit("removeRoom", id)
      return
    }

    client.to(id).emit("exit", {
      user: "system",
      chat: `${session.color}님이 퇴장 하셨습니다.`
    })
  }

  @SubscribeMessage("message")
  handleMessage(@ConnectedSocket() client: Socket): string {
    return "Hello world!"
  }
}
