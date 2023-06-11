// eslint-disable-next-line no-undef
const nodejs = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE)

nodejs.createCollection("users")
nodejs.createCollection("comments")

nodejs.users.insertMany([
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

const commenter = nodejs.users.findOne({ name: "harry" }, { _id: 1 })._id

nodejs.comments.insertOne({
  commenter,
  comment: "This is harry's comment",
  createdAt: new Date()
})
