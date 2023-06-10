import { Router } from "express"

import { dataSource } from "../core/datasource"
import { Comment } from "../entity"

const repository = dataSource.getRepository(Comment)

export const commentsRouter = Router()

commentsRouter
  .route("/comments")
  .get(async (req, res) => {
    const comments = await repository.find()
    res.json(comments)
  })
  .post(async (req, res) => {
    const comment = await repository.save(
      repository.create({
        comment: req.body.comment,
        commenter: req.body.id
      })
    )
    res.json(comment)
  })

commentsRouter
  .route("/comments/:id")
  .get(async (req, res) => {
    const comment = await repository.findOneBy({
      id: +req.params.id
    })
    res.json(comment)
  })
  .patch(async (req, res) => {
    await repository.update(
      { id: +req.params.id },
      {
        comment: req.body.comment
      }
    )
    const comment = await repository.findOneBy({ id: +req.params.id })
    res.json(comment)
  })
  .delete(async (req, res) => {
    const result = await repository.delete({
      id: +req.params.id
    })
    res.json(result)
  })
