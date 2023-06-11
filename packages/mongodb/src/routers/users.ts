import { Router } from "express"

import { User, Comment } from "../schema"

export const usersRouter = Router()

usersRouter
  .route("/users")
  .get(async (req, res) => {
    const users = await User.find({})
    res.json(users)
  })
  .post(async (req, res) => {
    const user = await User.create({
      name: req.body.name,
      age: req.body.age,
      married: req.body.married
    })
    res.status(201).json(user)
  })

usersRouter.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json(user)
})

usersRouter.get("/users/:id/comments", async (req, res) => {
  const comments = await Comment.find({ commenter: req.params.id }).populate("commenter")
  res.json(comments)
})
