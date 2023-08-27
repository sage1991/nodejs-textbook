import { IoAdapter } from "@nestjs/platform-socket.io"
import { type RequestHandler } from "express"
import { type Server } from "socket.io"

export class SessionAdaptor extends IoAdapter {
  constructor(private readonly session: RequestHandler) {
    super()
  }

  createIOServer(port: number, options?: any): Server {
    const server: Server = super.createIOServer(port, options)
    server.engine.use(this.session)
    return server
  }
}
