import { Router } from "express"

export const viewRouter = Router()

viewRouter.use((req, res, next) => {
  res.locals.user = null
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

viewRouter.get("/profile", (req, res) => {
  res.render("profile", {
    title: "내 정보 - NodeBird"
  })
})

viewRouter.get("/join", (req, res) => {
  res.render("join", {
    title: "회원가입 - NodeBird"
  })
})
