import d9Voters from './d9-voters.json'

const voters = d9Voters as string[][]

console.log(`Loaded voter file: ${voters.length} rows`)

const firstRow = voters[0]
console.log(firstRow)

const randRow = voters[Math.floor(Math.random() * voters.length)]
console.log(randRow)

const arrayToObject = (array: string[]): { [key: string]: string } => {
  const obj: { [key: string]: string } = {}
  array.forEach((value, index) => (obj[firstRow[index]] = value))
  return obj
}
const randRowObj = arrayToObject(randRow)
console.log(randRowObj)
