import { resolve } from "path"
import { createReadStream, createWriteStream } from "fs"

console.log("before: ", process.memoryUsage().rss.toLocaleString("ko-KR"))

const from = resolve(__dirname, "Stephan's Quintet.png")
const to = resolve(__dirname, "Stephan's Quintet.copy.png")

const readStream = createReadStream(from)
const writeStream = createWriteStream(to)
readStream.pipe(writeStream)

readStream.on("end", () => {
  console.log("after: ", process.memoryUsage().rss.toLocaleString("ko-KR"))
})
