import { Router } from "express"

import { dataSource } from "../core/datasource"
import { User } from "../entity"

export const usersRouter = Router()

usersRouter.get("/users", async (req, res) => {
  const users = await dataSource.getRepository(User).find()
  res.json(users)
})

usersRouter.get("/users/:id", async (req, res) => {
  const user = await dataSource.getRepository(User).findOneBy({
    id: +req.params.id
  })
  res.json(user)
})

usersRouter.get("/users/:id/comments", async (req, res) => {
  const user = await dataSource.getRepository(User).findOneBy({
    id: +req.params.id
  })
  res.json((await user?.comments) ?? [])
})
