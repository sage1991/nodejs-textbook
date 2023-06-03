import { access } from "fs/promises"
import { constants } from "fs"

export const exist = async (file: string) => {
  try {
    await access(file, constants.F_OK | constants.R_OK | constants.W_OK)
    return true
  } catch (e) {
    return !(e instanceof Error && "code" in e && e.code === "ENOENT")
  }
}
