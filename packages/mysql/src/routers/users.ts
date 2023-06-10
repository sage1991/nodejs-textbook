import { Router } from "express"

import { dataSource } from "../core/datasource"
import { User } from "../entity"

const repository = dataSource.getRepository(User)

export const usersRouter = Router()

usersRouter
  .route("/users")
  .get(async (req, res) => {
    const users = await repository.find()
    res.json(users)
  })
  .post(async (req, res) => {
    const user = await repository.save(
      repository.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married
      })
    )
    res.status(201).json(user)
  })

usersRouter.get("/users/:id", async (req, res) => {
  const user = await repository.findOneBy({
    id: +req.params.id
  })
  res.json(user)
})

usersRouter.get("/users/:id/comments", async (req, res) => {
  const user = await repository.findOneBy({
    id: +req.params.id
  })
  res.json((await user?.comments) ?? [])
})
