import { isMainThread, parentPort, Worker, workerData } from "worker_threads"

// [ workerData ]
if (isMainThread) {
  const threads = new Set()
  const numbers = [1, 2, 3, 4]
  numbers.forEach((value) => {
    const worker = new Worker(__filename, {
      execArgv: ["--require", "ts-node/register"],
      workerData: { value }
    })
    worker.on("message", (message) => {
      console.log("message from worker: ", message)
    })
    worker.on("exit", () => {
      console.log("worker exit")
      threads.delete(worker)
      if (threads.size === 0) {
        console.log("job done")
      }
    })
    threads.add(worker)
  })
}

if (!isMainThread) {
  let { value } = workerData as { value: number }
  value += 1000
  parentPort?.postMessage({ value })
}
