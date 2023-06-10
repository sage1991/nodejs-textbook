import { Router } from "express"

import { dataSource } from "../core/datasource"
import { User } from "../entity"

export const indexRouter = Router()

indexRouter.get("/", async (req, res) => {
  const users = await dataSource.getRepository(User).find()
  res.render("index", { users })
})
