import { Router } from "express"

import { Comment } from "../schema"

export const commentsRouter = Router()

commentsRouter
  .route("/comments")
  .get(async (req, res) => {
    const comments = await Comment.find({}).populate("commenter")
    res.json(comments)
  })
  .post(async (req, res) => {
    const comment = await Comment.create({
      comment: req.body.comment,
      commenter: req.body.id
    })
    const result = await Comment.populate(comment, { path: "commenter" })
    res.json(result)
  })

commentsRouter
  .route("/comments/:id")
  .get(async (req, res) => {
    const comment = await Comment.findById(req.params.id)
    res.json(comment)
  })
  .patch(async (req, res) => {
    const result = await Comment.updateOne(
      { _id: req.params.id },
      {
        comment: req.body.comment
      }
    )
    res.json(result)
  })
  .delete(async (req, res) => {
    const result = await Comment.deleteOne({ _id: req.params.id })
    res.json(result)
  })
