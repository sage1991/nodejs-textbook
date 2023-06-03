import { resolve } from "path"
import { readFile, writeFile } from "fs/promises"

const file = resolve(__dirname, "write-file.md")

writeFile(file, "# WRITE ME!")
  .then(() => readFile(file))
  .then((data) => {
    console.log(data.toString())
  })
  .catch((error) => {
    console.error(error)
  })
