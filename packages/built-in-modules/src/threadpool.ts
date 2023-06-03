import { pbkdf2 } from "crypto"

console.log("UV_THREADPOOL_SIZE: ", process.env.UV_THREADPOOL_SIZE)

const pass = "pass"
const salt = "salt"
const start = Date.now()

for (let i = 0; i < 8; i++) {
  pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
    console.log(`${i + 1}: `, Date.now() - start)
  })
}
