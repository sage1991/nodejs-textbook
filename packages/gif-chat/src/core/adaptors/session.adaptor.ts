import { IoAdapter } from "@nestjs/platform-socket.io"
import { type RequestHandler } from "express"
import { type Server, type ServerOptions } from "socket.io"

export class SessionAdaptor extends IoAdapter {
  constructor(private readonly sessions: RequestHandler[]) {
    super()
  }

  createIOServer(port: number, options?: ServerOptions): Server {
    const server: Server = super.createIOServer(port, options)
    this.sessions.forEach((middleware) => {
      server.engine.use(middleware)
    })
    return server
  }
}
