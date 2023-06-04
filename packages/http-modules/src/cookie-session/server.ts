import { createServer } from "http"
import { URLSearchParams } from "url"
import { readFile } from "fs/promises"
import { resolve } from "path"

interface Session {
  name: string
  expires: Date
}

const sessions = new Map<number, Session>()

const parseCookies = (cookie: string = "") => {
  return cookie
    .split(";")
    .map((entry) => entry.trim().split("="))
    .reduce<Record<string, string>>((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
}

const server = createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie)

  if (req.url?.startsWith("/login")) {
    const search = req.url.slice(req.url.indexOf("?"))
    const params = new URLSearchParams(search)

    const name = params.get("name") ?? ""
    const expires = new Date()
    expires.setMinutes(expires.getMinutes() + 5)

    const key = Date.now()
    sessions.set(key, {
      name,
      expires
    })

    res.writeHead(302, {
      Location: "/",
      "Set-Cookie": `session=${key}; Expires=${expires.toUTCString()}; HttpOnly; Path=/`
    })
    res.end()
    return
  }

  const session = sessions.get(+cookies.session)
  const isSessionAlive = !!session && session.expires.valueOf() > Date.now()

  if (isSessionAlive) {
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8"
    })
    res.end(`Hi ${session.name}!`)
    return
  }

  try {
    const index = resolve(__dirname, "index.html")
    const data = await readFile(index)
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    })
    res.end(data)
  } catch (e) {
    console.error(e)
    res.writeHead(500, {
      "Content-Type": "text/plain; charset=utf-8"
    })
    res.end(e instanceof Error ? e.message : "Something went wrong")
  }
})

server.listen(3000, () => {
  console.log("Server start at port 3000")

  setInterval(() => {
    const now = Date.now()
    for (const key of sessions.keys()) {
      const { expires } = sessions.get(key)!
      const isExpired = expires.valueOf() <= now
      isExpired && sessions.delete(key)
    }
  }, 1000 * 60)
})
