import os from "os"

console.log("[ OS 정보 ]")
console.log("os.arch(): ", os.arch())
console.log("os.platform(): ", os.platform())
console.log("os.type(): ", os.type())
console.log("os.uptime(): ", os.uptime())
console.log("os.hostname(): ", os.hostname())
console.log("os.release(): ", os.release())

console.log("[ 경로 ]")
console.log("os.homedir(): ", os.homedir())
console.log("os.tmpdir(): ", os.tmpdir())

console.log("[ CPU ]")
console.log("os.cpus(): ", os.cpus())
console.log("os.cpus().length: ", os.cpus().length)

console.log("[ Memory ]")
console.log("os.cpus(): ", os.freemem())
console.log("os.cpus().length: ", os.totalmem())