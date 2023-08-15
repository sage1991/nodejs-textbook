import { readFile } from "fs/promises"
import { createServer } from "http"
import { resolve } from "path"

const index = resolve(__dirname, "index.html")

const server = createServer(async (req, res) => {
  try {
    const data = await readFile(index)
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    })
    res.end(data)
  } catch (e) {
    console.error(e)
    res.writeHead(500, {
      "Content-Type": "text/plain; charset=utf-8"
    })
    res.end(e instanceof Error ? e.message : "Error")
  }
})

server.listen(3000)

server.on("listening", () => {
  console.log("Server start at 3000 port")
})

server.on("error", (e) => {
  console.error(e)
})
