import crypto from "crypto"
import { promisify } from "util"

const input = "비밀번호"

// [ 단방향 암호화 ]
const randomBytes = promisify(crypto.randomBytes)
const pbkdf2 = promisify(crypto.pbkdf2)

const base64 = crypto.createHash("sha512").update(input).digest("base64")
const hex = crypto.createHash("sha512").update(input).digest("hex")

console.log("base64: ", base64)
console.log("hex: ", hex)

const hash = async (password: string) => {
  const ITERATION_COUNT = 1000
  const OUTPUT_BYTE_LENGTH = 64

  const buffer = await randomBytes(64)
  const salt = buffer.toString("base64")
  console.log("salt: ", salt)
  const result = await pbkdf2(password, salt, ITERATION_COUNT, OUTPUT_BYTE_LENGTH, "sha512")
  return result.toString("base64")
}

hash(input).then((password) => {
  console.log("password: ", password)
})

// [ 양방향 암호화 ]
const algorithm = "aes-256-cbc"
const key = "abcdefghijklmnopqrstuvwxyz123456"
const iv = "1234567890123456"

// 암호화
const cipher = crypto.createCipheriv(algorithm, key, iv)
let encrypted = cipher.update(input, "utf8", "base64")
encrypted += cipher.final("base64")
console.log("encrypted: ", encrypted)

// 복호화
const decipher = crypto.createDecipheriv(algorithm, key, iv)
let decrypted = decipher.update(encrypted, "base64", "utf8")
decrypted += decipher.final("utf8")
console.log("decrypted: ", decrypted)
