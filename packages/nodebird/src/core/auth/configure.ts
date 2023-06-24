import passport from "passport"
import { userRepository } from "../../repository"

export const configure = () => {
  passport.serializeUser((user: any, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await userRepository.findOneBy({ id })
      done(null, user)
    } catch (e) {
      done(e)
    }
  })
}
