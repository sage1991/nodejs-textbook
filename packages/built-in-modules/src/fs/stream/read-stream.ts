import { resolve } from "path"
import { createReadStream } from "fs"

const file = resolve(__dirname, "read-stream.md")

const readStream = createReadStream(file, { highWaterMark: 16 }) // Set buffer size to 16 byte (default 64KB)
const data: Buffer[] = []

readStream.on("data", (chunk: Buffer) => {
  data.push(chunk)
  console.log("chunk: ", chunk, chunk.length)
})

readStream.on("error", (error) => {
  console.error(error)
})

readStream.on("end", () => {
  console.log(Buffer.concat(data).toString())
})
