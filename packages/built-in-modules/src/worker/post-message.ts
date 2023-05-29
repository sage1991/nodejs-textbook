import { Worker, isMainThread, parentPort } from "worker_threads"

if (isMainThread) {
  const worker = new Worker(__filename, { execArgv: ["--require", "ts-node/register"] })
  worker.on("message", (message) => {
    console.log("message from worker: ", message)
  })
  worker.on("exit", () => {
    console.log("worker exit")
  })
  worker.postMessage("ping")
}

if (!isMainThread) {
  parentPort?.on("message", (message) => {
    console.log("message from parent: ", message)
    parentPort?.postMessage("pong")
    parentPort?.close()
  })
}
