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
    const req = client.request
    console.log(req)

    const {
      headers: { referer }
    } = req

    const { pathname } = new URL(referer)
    const id = pathname.split("/").pop()
    client.join(id)

    client.to(id).emit("join", {
      user: "system",
      chat: "님이 입장 하셨습니다."
    })
  }

  handleDisconnect(client: Socket) {
    console.log("chat namespace 에서 접속 해제")
    const {
      headers: { referer }
    } = client.request
    const { pathname } = new URL(referer)
    const id = pathname.split("/").pop()
    client.leave(id)

    client.to(id).emit("exit", {
      user: "system",
      chat: "님이 입장 하셨습니다."
    })
  }

  @SubscribeMessage("message")
  handleMessage(@ConnectedSocket() client: Socket): string {
    return "Hello world!"
  }
}
