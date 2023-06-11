/* eslint-disable no-undef */
// Reference: https://www.mongodb.com/docs/manual/reference/method/#database

db.createCollection("users")
db.createCollection("comments")

db.users.insertMany([
  {
    name: "harry",
    age: 24,
    married: false,
    comment: "Hello from harry",
    createdAt: new Date()
  },
  {
    name: "kane",
    age: 33,
    married: true,
    comment: "Hello from kane",
    createdAt: new Date()
  }
])

const commenter = db.users.findOne({ name: "harry" }, { _id: 1 })._id

db.comments.insertOne({
  commenter,
  comment: "This is harry's comment",
  createdAt: new Date()
})
