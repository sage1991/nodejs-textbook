import { Router } from "express"
import bcrypt from "bcrypt"
import passport from "passport"

import { isAuthenticated, isNotAuthenticated } from "../middlewares"
import { userRepository } from "../repository"

export const authRouter = Router()

authRouter.post("/join", isNotAuthenticated, async (req, res, next) => {
  const { email, nickname, password } = req.body
  try {
    const user = await userRepository.findOneBy({ email })
    if (user) {
      res.redirect("/join?error=exist")
      return
    }

    const hash = await bcrypt.hash(password, 12)
    await userRepository.save(
      userRepository.create({
        email,
        nickname,
        password: hash
      })
    )
    res.redirect("/")
  } catch (e) {
    console.error(e)
    next(e)
  }
})

authRouter.post("/login", isNotAuthenticated, (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      next(error)
      return
    }

    if (!user) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      res.redirect(`/?loginError=${info.message}`)
    }

    req.login(user, (loginError) => {
      if (loginError) {
        console.log(loginError)
        next(loginError)
        return
      }
      res.redirect("/")
    })
  })(req, res, next)
})

authRouter.post("/logout", isAuthenticated, (req, res) => {
  req.logout()
  req.session.destroy(() => {
    res.redirect("/")
  })
})
