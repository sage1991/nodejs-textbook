import { createWriteStream } from "fs"
import { resolve } from "path"

const file = resolve(__dirname, "write-stream.md")

const writeStream = createWriteStream(file)
writeStream.on("finish", () => {
  console.log("write finished")
})

writeStream.write("# WRITE STREAM\n")
writeStream.write("> 한 번 더 씁니다\n")
writeStream.end()
