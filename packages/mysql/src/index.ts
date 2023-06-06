import "reflect-metadata"
import "./env"

import express, { type Request, type Response } from "express"
import nunjucks from "nunjucks"
import { resolve } from "path"
import morgan from "morgan"

import { HttpError } from "./error"
import { sequelize } from "./sequelize"

const app = express()
app.set("port", process.env.PORT ?? 3000)
app.set("view engine", "html")
nunjucks.configure("views", {
  express: app,
  watch: true
})

app.use(morgan("dev"))
app.use(express.static(resolve(__dirname, "../public")))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  next(new HttpError({ status: 404, message: "Not Found" }))
})

app.use((error: Error, req: Request, res: Response) => {
  res
    .status(error instanceof HttpError ? error.status : 500)
    .render("error", { message: error.message })
})

const main = async () => {
  try {
    await sequelize.sync({ force: false })
    console.log("DB connection successful")
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
  app.listen(app.get("port"), () => {
    console.log(`Server listening on port ${app.get("port") as string}`)
  })
}

main()
