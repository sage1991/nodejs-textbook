import { createReadStream, createWriteStream } from "fs"
import { resolve } from "path"

const from = resolve(__dirname, "pipe-from.md")
const to = resolve(__dirname, "pipe-to.md")

const readStream = createReadStream(from)
const writeStream = createWriteStream(to)
readStream.pipe(writeStream)
