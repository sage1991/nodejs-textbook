import { watch } from "fs"
import { resolve } from "path"

const file = resolve(__dirname, "watch.md")

watch(file, (type, filename) => {
  console.log(type, filename)
})
