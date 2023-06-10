import { Router } from "express"

import { dataSource } from "../core/datasource"
import { Comment } from "../entity"

export const commentsRouter = Router()

commentsRouter.get("/comments", async (req, res) => {
  const comments = await dataSource.getRepository(Comment).find()
  res.json(comments)
})

commentsRouter.get("/comments/:id", async (req, res) => {
  const comment = await dataSource.getRepository(Comment).findOneBy({
    id: +req.params.id
  })
  res.json(comment)
})

commentsRouter.get("/comments/:id/user", async (req, res) => {
  const comment = await dataSource.getRepository(Comment).findOneBy({
    id: +req.params.id
  })
  res.json(await comment?.user)
})
