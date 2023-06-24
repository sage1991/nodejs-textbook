import { type RequestHandler } from "express"

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
    return
  }
  res.status(403).send("Forbidden")
}

export const isNotAuthenticated: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next()
    return
  }
  res.redirect(`/?error=${encodeURIComponent("Already logged in")}`)
}
