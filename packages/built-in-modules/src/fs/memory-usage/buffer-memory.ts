import { readFileSync, writeFileSync } from "fs"
import { resolve } from "path"

console.log("before: ", process.memoryUsage().rss.toLocaleString("ko-KR"))

const from = resolve(__dirname, "Stephan's Quintet.png")
const to = resolve(__dirname, "Stephan's Quintet.copy.png")
const data = readFileSync(from)
writeFileSync(to, data)

console.log("after: ", process.memoryUsage().rss.toLocaleString("ko-KR"))
