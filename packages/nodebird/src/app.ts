import cookieParser from "cookie-parser"
import express from "express"
import session from "express-session"
import morgan from "morgan"
import nunjucks from "nunjucks"
import passport from "passport"
import { resolve } from "path"

import { Env } from "./core/const"
import { datasource } from "./core/datasource"
import { configure } from "./core/passport"
import { authRouter, viewRouter } from "./routes"

export const bootstrap = async () => {
  const app = express()
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

  configure()
  app.use(passport.initialize())
  app.use(passport.session())

  app.use(viewRouter)
  app.use("/auth", authRouter)

  try {
    await datasource.initialize()
    console.log("DB connection successful")
  } catch (e) {
    console.error(e)
    process.exit(1)
  }

  app.listen(Env.port, () => {
    console.log(`Server listening on port ${Env.port}`)
  })
}
