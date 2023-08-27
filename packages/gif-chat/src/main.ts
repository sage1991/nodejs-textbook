import "./init-env"

import { NestFactory } from "@nestjs/core"
import { type NestExpressApplication } from "@nestjs/platform-express"
import mongoose from "mongoose"
import nunjucks from "nunjucks"
import path from "path"

import { AppModule } from "./app.module"
import { WebSocketAdaptor } from "./core/adaptors"
import { color, session } from "./core/middlewares"

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.use(session)
  app.use(color)

  const views = path.resolve(__dirname, "../views")
  nunjucks.configure(views, { express: app.getHttpAdapter().getInstance(), watch: true })
  app.useStaticAssets(path.resolve(__dirname, "../public"))
  app.setBaseViewsDir(views)
  app.setViewEngine("njk")

  app.useWebSocketAdapter(new WebSocketAdaptor([session, color]))

  mongoose.set("debug", true)
  await app.listen(3000)
}

void bootstrap()
