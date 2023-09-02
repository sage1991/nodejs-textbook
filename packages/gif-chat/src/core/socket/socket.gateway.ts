import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { Server } from "socket.io"

import { Env, type WebSocketNamespace } from "../const"

@WebSocketGateway(Env.webSocketPort, { transports: ["websocket"] })
export class SocketGateway {
  @WebSocketServer()
  public readonly server: Server

  of(namespace: WebSocketNamespace) {
    return this.server.of(namespace)
  }
}
