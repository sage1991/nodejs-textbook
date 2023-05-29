import { deprecate, promisify } from "util"
import crypto from "crypto"

const add = deprecate((a: number, b: number) => a + b, "This function is deprecated")
const result = add(1, 2)
console.log("result: ", result)

const randomBytes = promisify(crypto.randomBytes)
randomBytes(64)
  .then((buffer) => {
    console.log("random: ", buffer.toString("base64"))
  })
  .catch(console.error)
