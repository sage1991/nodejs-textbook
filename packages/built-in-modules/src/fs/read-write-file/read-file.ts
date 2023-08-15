import { readFile } from "fs/promises"
import { resolve } from "path"

readFile(resolve(__dirname, "read-file.md"))
  .then((data) => {
    console.log(data)
    console.log(data.toString())
  })
  .catch((error) => {
    console.error(error)
  })
