import ExpressSession from "express-session"

import { Env } from "../const"

export const session = ExpressSession({
  resave: false,
  saveUninitialized: false,
  secret: Env.cookieSecret,
  cookie: {
    httpOnly: true,
    secure: false
  }
})
