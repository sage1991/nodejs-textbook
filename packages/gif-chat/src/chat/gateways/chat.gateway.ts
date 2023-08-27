import {
  ConnectedSocket,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets"
import { type Server, type Socket } from "socket.io"

@WebSocketGateway({ namespace: "chat", transports: ["websocket"] })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server

  handleConnection(client: Socket) {
    console.log("chat namespace 에 접속")
    const {
      headers: { referer },
      session
    } = client.request

    const { pathname } = new URL(referer)
    const id = pathname.split("/").pop()
    client.join(id)

    client.to(id).emit("join", {
      user: "system",
      chat: `${session.color}님이 입장 하셨습니다.`
    })
  }

  async handleDisconnect(client: Socket) {
    console.log("chat namespace 에서 접속 해제")
    const {
      headers: { referer },
      session
    } = client.request
    const { pathname } = new URL(referer)
    const id = pathname.split("/").pop()
    client.leave(id)

    const sockets = await client.in(id).fetchSockets()
    if (sockets.length === 0) {
      // remove room
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
