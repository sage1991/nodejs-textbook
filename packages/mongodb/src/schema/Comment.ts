import { model, Schema } from "mongoose"

const schema = new Schema({
  commenter: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "User"
  },
  comment: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Comment = model("Comment", schema)
