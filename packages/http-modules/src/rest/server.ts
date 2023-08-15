import { readFile } from "fs/promises"
import { createServer, type RequestListener } from "http"
import { join } from "path"

const html: RequestListener = async (req, res) => {
  let { url = "/" } = req
  if (url === "/") {
    url = "/index"
  }
  url = `${url}.html`

  const file = join(__dirname, `${url}`)
  const data = await readFile(file)
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8"
  })
  res.end(data)
}

const js: RequestListener = async (req, res) => {
  const { url = "index.js" } = req
  const file = join(__dirname, `${url}`)
  const data = await readFile(file)
  res.writeHead(200, {
    "Content-Type": "application/javascript; charset=utf-8"
  })
  res.end(data)
}

const css: RequestListener = async (req, res) => {
  const { url = "index.css" } = req
  const file = join(__dirname, `${url}`)
  const data = await readFile(file)
  res.writeHead(200, {
    "Content-Type": "text/css; charset=utf-8"
  })
  res.end(data)
}

const getUser: RequestListener = (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json; charset=utf-8"
  })
  res.end(
    JSON.stringify(
      Array.from(users.entries()).reduce<Record<string, string>>((acc, [key, value]) => {
        acc[key] = value
        return acc
      }, {})
    )
  )
}

const addUser: RequestListener = (req, res) => {
  const buffers: Buffer[] = []
  req.on("data", (data: Buffer) => {
    buffers.push(data)
  })
  req.on("end", () => {
    const body = JSON.parse(Buffer.concat(buffers).toString())
    console.log("Request body: ", body)
    users.set(Date.now().toString(), body.name)
    res.writeHead(201, {
      "Content-Type": "application/json; charset=utf-8"
    })
    res.end()
  })
}

const updateUser: RequestListener = (req, res) => {
  const buffers: Buffer[] = []
  req.on("data", (data: Buffer) => {
    buffers.push(data)
  })
  req.on("end", () => {
    const body = JSON.parse(Buffer.concat(buffers).toString())
    console.log("Request body: ", body)
    const id = req.url?.split("/").pop() ?? ""
    if (users.has(id)) {
      users.set(id, body.name)
    }
    res.writeHead(200)
    res.end()
  })
}

const deleteUser: RequestListener = (req, res) => {
  const id = req.url?.split("/").pop() ?? ""
  users.delete(id)
  res.writeHead(200)
  res.end()
}

const users = new Map<string, string>()

const server = createServer((req, res) => {
  const { method, url } = req
  console.log("method: ", method)
  console.log("url: ", url)

  try {
    if (method === "GET") {
      if (url === "/" || url === "/about") {
        html(req, res)
        return
      }
      if (url?.endsWith(".css")) {
        css(req, res)
        return
      }
      if (url?.endsWith(".js")) {
        js(req, res)
        return
      }
      if (url === "/users") {
        getUser(req, res)
        return
      }
    }

    if (method === "POST") {
      if (url === "/users") {
        addUser(req, res)
        return
      }
    }

    if (method === "PUT") {
      if (url?.startsWith("/users")) {
        updateUser(req, res)
        return
      }
    }

    if (method === "DELETE") {
      if (url?.startsWith("/users")) {
        deleteUser(req, res)
        return
      }
    }

    res.writeHead(404, {
      "Content-Type": "text/plain; charset=utf-8"
    })
    res.end("Not Found")
  } catch (e) {
    res.writeHead(500, {
      "Content-Type": "text/plain; charset=utf-8"
    })
    res.end(e instanceof Error ? e.message : "Something went wrong")
  }
})

server.listen(3000, () => {
  console.log("Server start at port 3000")
})
