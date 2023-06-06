import express from "express"

export const usersRouter = express.Router()

usersRouter.get("/users", (req, res) => {
  res.send("Hello from user!")
})
