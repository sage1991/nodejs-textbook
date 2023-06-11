import express from "express"
import nunjucks from "nunjucks"
import { resolve } from "path"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import session from "express-session"

import { Env } from "./core/const"

export const bootstrap = () => {
  const app = express()
  app.set("port", Env.port)
  app.set("view engine", "html")
  nunjucks.configure(resolve(__dirname, "../public"), {
    express: app,
    watch: true
  })

  app.use(morgan("dev"))
  app.use(express.static(resolve(__dirname, "../public")))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser(Env.cookieSecret))
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: Env.cookieSecret,
      cookie: {
        httpOnly: true,
        secure: false
      }
    })
  )

  app.listen(app.get("port"), () => {
    console.log(`Server listening on port ${app.get("port") as number}`)
  })
}
