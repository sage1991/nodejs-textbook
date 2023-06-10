import express, { type Request, type Response } from "express"
import nunjucks from "nunjucks"
import morgan from "morgan"
import { resolve } from "path"

import { dataSource } from "./core/datasource"
import { HttpError } from "./core/error"
import { Env } from "./core/const"

import { indexRouter } from "./routers"
import { usersRouter } from "./routers/users"
import { commentsRouter } from "./routers/comments"

export const bootstrap = async () => {
  const app = express()

  app.set("port", Env.port)
  app.set("view engine", "html")
  nunjucks.configure(resolve(__dirname, "../public"), {
    express: app,
    watch: true
  })

  app.use(morgan("dev"))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use(
    express.static(resolve(__dirname, "../public"), {
      index: false
    })
  )

  app.use(indexRouter)
  app.use(usersRouter)
  app.use(commentsRouter)

  app.use((req, res, next) => {
    next(new HttpError({ status: 404, message: "Not Found" }))
  })

  app.use((error: Error, req: Request, res: Response) => {
    res
      .status(error instanceof HttpError ? error.status : 500)
      .render("error", { message: error.message, error })
  })

  try {
    await dataSource.initialize()
    console.log("DB connection successful")
  } catch (e) {
    console.error(e)
    process.exit(1)
  }

  app.listen(app.get("port"), () => {
    console.log(`Server listening on port ${app.get("port") as number}`)
  })
}
