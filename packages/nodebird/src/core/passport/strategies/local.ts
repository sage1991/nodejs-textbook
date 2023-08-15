import bcrypt from "bcrypt"
import { Strategy } from "passport-local"

import { userRepository } from "../../../repository"

export const local = new Strategy(
  {
    usernameField: "email",
    passwordField: "password"
  },
  async (email, password, done) => {
    try {
      const user = await userRepository.findOneBy({ email })
      if (!user) {
        done(null, false, { message: "User not found" })
        return
      }

      const isSame = await bcrypt.compare(password, user.password)
      if (isSame) {
        done(null, user)
        return
      }

      done(null, false, { message: "Wrong password" })
    } catch (e) {
      console.log(e)
      done(e)
    }
  }
)
