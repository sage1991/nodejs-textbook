import { model, Schema } from "mongoose"

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  married: {
    type: Boolean,
    required: true
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const User = model("User", schema)
