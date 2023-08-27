import { type Session, type SessionData } from "express-session"

export declare module "http" {
  interface IncomingMessage {
    session: Session & Partial<SessionData>
  }
}
