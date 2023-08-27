import ColorHash from "color-hash"
import { type NextFunction, type Request, type Response } from "express"

export const color = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.color) {
    req.session.color = new ColorHash().hex(req.sessionID)
  }
  next()
}
