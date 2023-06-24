import { Router } from "express"

import { isAuthenticated, isNotAuthenticated } from "../middlewares"

export const viewRouter = Router()

viewRouter.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.followerCount = 0
  res.locals.followingCount = 0
  res.locals.followerIdList = []
  next()
})

viewRouter.get("/", (req, res) => {
  const twits = [] as string[]
  res.render("main", {
    title: "NodeBird",
    twits
  })
})

viewRouter.get("/profile", isAuthenticated, (req, res) => {
  res.render("profile", {
    title: "내 정보 - NodeBird"
  })
})

viewRouter.get("/join", isNotAuthenticated, (req, res) => {
  res.render("join", {
    title: "회원가입 - NodeBird"
  })
})
