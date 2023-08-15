import { createReadStream, createWriteStream } from "fs"
import { resolve } from "path"
import { createGzip } from "zlib"

const from = resolve(__dirname, "gzip.md")
const to = resolve(__dirname, "gzip.md.gz")

const readStream = createReadStream(from)
const zipStream = createGzip()
const writeStream = createWriteStream(to)
readStream.pipe(zipStream).pipe(writeStream)
