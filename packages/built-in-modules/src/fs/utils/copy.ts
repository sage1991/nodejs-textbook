import { copyFile } from "fs/promises"
import { resolve } from "path"

const original = resolve(__dirname, "copy.md")
const copied = resolve(__dirname, "copy.copy.md")

copyFile(original, copied)
  .then(() => {
    console.log("Copy success")
  })
  .catch(console.error)
