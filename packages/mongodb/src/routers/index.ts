import { Router } from "express"

import { User } from "../schema"

export const indexRouter = Router()

indexRouter.get("/", async (req, res) => {
  const users = await User.find({})
  res.render("index", { users })
})
