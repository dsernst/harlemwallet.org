// TODO: this script is unfinished

import { Database } from 'bun:sqlite'
import d9Voters from './d9-voters.json'
const voters = d9Voters as string[][]

const db = new Database(__dirname + '/db.sqlite')

// load json file
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
// Test
const randRowObj = arrayToObject(randRow)
console.log(randRowObj)

// TODO: Convert all of them into objects

// TODO: Insert all into DB
const query = db.query('INSERT INTO voters (name, party) VALUES (?, ?)')
console.log('inserted')
