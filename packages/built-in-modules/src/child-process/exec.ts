import { exec } from "child_process"

// "exec" spawns a shell and executes the command within that shell
const process = exec("ls")

process.stdout?.on("data", (data: Buffer) => {
  console.log(data.toString())
})

process.stderr?.on("data", (data: Buffer) => {
  console.log(data.toString())
})
