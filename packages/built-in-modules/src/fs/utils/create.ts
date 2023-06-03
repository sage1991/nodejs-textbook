import { mkdir, open, rename } from "fs/promises"
import { resolve } from "path"

import { exist } from "./exist"

const main = async () => {
  const directory = resolve(__dirname, "directory")
  const file = resolve(directory, "file.ts")
  const renamedFile = resolve(directory, "file.renamed.ts")

  const isExist = await exist(directory)
  if (isExist) {
    throw new Error("Directory already exist")
  }

  await mkdir(directory)
  console.log("Create directory success")

  await open(file, "w")
  console.log("Create empty file success")

  await rename(file, renamedFile)
  console.log("Rename file success")
}

main().catch(console.error)
