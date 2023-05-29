import { Worker, isMainThread, parentPort, workerData } from "worker_threads"

import { findPrimeNumbers, type Range } from "./findPrimeNumbers"

if (isMainThread) {
  const from = 2
  const to = 10000000
  const THREAD_COUNT = 8
  const range = Math.ceil((to - from + 1) / THREAD_COUNT)

  const threads = new Set()
  let primes: number[] = []

  console.time("prime")

  for (let i = 0; i < THREAD_COUNT; i++) {
    const _from = from + i * range
    const _to = Math.min(_from + range - 1, to)
    const worker = new Worker(__filename, {
      execArgv: ["--require", "ts-node/register"],
      workerData: { from: _from, to: _to }
    })
    worker.on("error", console.error)
    worker.on("message", (values: number[]) => {
      primes = primes.concat(values)
    })
    worker.on("exit", () => {
      threads.delete(worker)
      if (threads.size === 0) {
        console.log(primes.length)
        console.timeEnd("prime")
      }
    })
    threads.add(worker)
  }
}

if (!isMainThread) {
  parentPort?.postMessage(findPrimeNumbers(workerData as Range))
}
