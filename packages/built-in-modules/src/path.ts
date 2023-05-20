import path from "path"

console.log("path.sep: ", path.sep)
console.log("path.delimiter: ", path.delimiter)
console.log("path.dirname(): ", path.dirname(__filename))
console.log("path.extname(): ", path.extname(__filename))
console.log("path.basename(): ", path.basename(__filename))
console.log(
  "path.basename() - path.extname(): ",
  path.basename(__filename, path.extname(__filename))
)
console.log("path.parse(): ", path.parse(__filename))
console.log(
  "path.format()",
  path.format({
    dir: __dirname,
    name: "path",
    ext: ".ts"
  })
)
console.log(
  "path.normalize(): ",
  path.normalize("//Users////harry.kane////../////harry.kane//developer////./sandbox")
)
console.log("path.isAbsolute(): ", path.isAbsolute("/Users/harry.kane"))
console.log("path.isAbsolute(): ", path.isAbsolute("../Users/harry.kane"))
console.log("path.relative(): ", path.relative("/Users/harry.kane", "/"))
console.log("path.join(): ", path.join(__dirname, "..", "src", ".", "/Users"))
console.log("path.resolve(): ", path.resolve(__dirname, "..", "src", ".", "/Users"))
