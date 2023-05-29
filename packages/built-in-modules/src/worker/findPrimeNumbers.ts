export interface Range {
  from: number
  to: number
}

export const findPrimeNumbers = ({ from, to }: Range) => {
  const primes: number[] = []
  for (let i = from; i <= to; i++) {
    let isPrimeNumber = true
    for (let j = 1; j <= Math.sqrt(i); j++) {
      if (j !== 1 && i !== j && i % j === 0) {
        isPrimeNumber = false
        break
      }
    }
    if (isPrimeNumber) {
      primes.push(i)
    }
  }
  return primes
}
