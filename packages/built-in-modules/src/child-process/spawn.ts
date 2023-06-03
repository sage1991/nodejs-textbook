import { spawn } from "child_process"
import { resolve } from "path"

const process = spawn("sh", [resolve(__dirname, "hello.sh")])

process.stdout.on("data", (data: Buffer) => {
  console.log(data.toString())
})

process.stderr.on("data", (data: Buffer) => {
  console.log(data.toString())
})
