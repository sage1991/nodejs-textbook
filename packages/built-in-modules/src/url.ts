import { format, URL } from "url"

const url = new URL(
  "https://github.com/sage1991/nodejs-textbook/blob/master/packages/built-in-modules/README.md?plain=1&category=nodejs&category=javascript#L1"
)
console.log("new URL(): ", url)
console.log("url.format(): ", format(url))

const { searchParams } = url
console.log(searchParams)
console.log("searchParams.getAll(): ", searchParams.getAll("category"))
console.log("searchParams.get(): ", searchParams.get("plain"))
console.log("searchParams.has(): ", searchParams.has("plain"))
console.log("searchParams.keys(): ", searchParams.keys())
console.log("searchParams.values(): ", searchParams.values())

searchParams.append("filter", "es3")
searchParams.append("filter", "es5")
console.log(searchParams.getAll("filter"))

searchParams.set("filter", "es6")
console.log(searchParams.getAll("filter"))

searchParams.delete("filter")
console.log(searchParams.getAll("filter"))

console.log("searchParams.toString(): ", searchParams.toString())

searchParams.set("limit", "20")
url.search = searchParams.toString()
console.log(url.search)
