import { readdir, rmdir, unlink } from "fs/promises"
import { resolve } from "path"

import { exist } from "./exist"

const main = async () => {
  const directory = resolve(__dirname, "directory")
  const file = resolve(directory, "file.renamed.ts")

  const isDirectoryExist = await exist(directory)
  if (!isDirectoryExist) {
    throw new Error("Directory not exist")
  }

  console.log(await readdir(directory))

  const isFileExist = await exist(file)
  if (!isFileExist) {
    throw new Error("File not exist")
  }

  await unlink(file)
  console.log("Remove file success")

  await rmdir(directory)
  console.log("Remove directory success")
}

main().catch(console.error)
