import dotenv from "dotenv"
import { resolve, extname, basename } from "path"
import { mkdirSync, readdirSync } from "fs"
import express, { type NextFunction, type Request, type Response } from "express"
import cookieParser from "cookie-parser"
import session from "express-session"
import morgan from "morgan"
import multer from "multer"

dotenv.config({ path: resolve(__dirname, "../.env") })

const storage = resolve(__dirname, "../public/uploads")

try {
  readdirSync(storage)
} catch (e) {
  console.log("Create uploads directory")
  mkdirSync(storage)
}

const app = express()
app.set("port", process.env.PORT ?? 3000)

// log
app.use(morgan("dev"))

// static
app.use("/", express.static(resolve(__dirname, "../public"), { extensions: ["html"] }))

// body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// cookie-parser
app.use(cookieParser(process.env.COOKIE_SECRET))

// express-session
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET!,
    name: "session-cookie",
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
)

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, storage)
    },
    filename(req, file, done) {
      const ext = extname(file.originalname)
      done(null, `${basename(file.originalname, ext)}${Date.now()}${ext}`)
    }
  }),
  limits: { fileSize: 5 * Math.pow(2, 20) }
})

app.post("/upload/single", upload.single("image"), (req, res) => {
  console.log(req.file, req.body)
  res.status(200).send("OK")
})

app.post("/upload/array", upload.array("images"), (req, res) => {
  console.log(req.files, req.body)
  res.status(200).send("OK")
})

app.post("/upload/fields", upload.fields([{ name: "image1" }, { name: "image2" }]), (req, res) => {
  console.log(req.files, req.body)
  res.status(200).send("OK")
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(err.message)
})

app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${(app.get("port") as string) ?? ""}`)
})
