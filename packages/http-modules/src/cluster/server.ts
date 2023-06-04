import cluster from "cluster"
import { createServer } from "http"
import * as os from "os"

const NUMBER_OF_CPU = os.cpus().length

if (cluster.isPrimary) {
  console.log(`Master process PID: ${process.pid}`)

  for (let i = 0; i < NUMBER_OF_CPU; i++) {
    cluster.fork()
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker with PID ${worker.process.pid ?? ""} is terminated`)
    console.log("code", code, "signal", signal)
    // Start new worker process (bad practice)
    // cluster.fork()
  })
}

if (cluster.isWorker) {
  const server = createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    })
    res.write("<h1>Node Cluster</h1>")
    res.end(`<p>Hello from worker ${process.pid}</p>`)
    setImmediate(() => process.exit(1))
  })

  server.listen(3000, () => {
    console.log(`Server listening on port 3000 (PID: ${process.pid})`)
  })
}
