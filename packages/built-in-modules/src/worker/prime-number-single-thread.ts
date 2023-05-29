import { findPrimeNumbers } from "./findPrimeNumbers"

const from = 2
const to = 10000000

console.time("primeNumbers")
const primeNumbers = findPrimeNumbers({ from, to })
console.timeEnd("primeNumbers")
console.log("primeNumbers", primeNumbers.length)
