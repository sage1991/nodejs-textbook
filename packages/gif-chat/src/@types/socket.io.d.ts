export declare module "socket.io" {
  import { type Request } from "express"
  import { type IncomingMessage } from "http"

  class Socket {
    get request(): IncomingMessage & {
      session: Request["session"]
    }
  }
}
