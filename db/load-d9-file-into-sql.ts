import { Database } from 'bun:sqlite'
const db = new Database(__dirname + '/db.sqlite')
const table = 'd9_voters'

// Load json file of all voters
import d9Voters from './d9-voters.json'
const voterFile = d9Voters as string[][]

// Get column names
const columns = voterFile[0]
console.log('columns', columns)

// Voters are every row after the first one
const voters = voterFile.slice(1)
console.log(`\nLoaded voter file: ${voters.length} rows\n`)

// Reset & create the SQLite table
db.query(`drop table if exists ${table}`).run()
const createTableQuery = `
  create table ${table} (
      ${columns.map((column) => `${column} text`).join(', ')},
      primary key (VSN)
  )`
// console.log('createTableQuery', createTableQuery)
db.query(createTableQuery).run()
console.log(`dropped and created table ${table}`)

// Insert row into the SQLite table
voters.forEach((voter, i) => {
  const insertQuery = `
    insert into ${table}
      (${columns.slice(0, voter.length).join(', ')}) values
      (${voter.map((v) => (v ? `"${v.replace(`"`, `'`)}"` : 'null')).join(', ')})`
  // console.log('insertQuery', insertQuery)

  try {
    db.query(insertQuery).run()
  } catch (e) {
    console.log(i, insertQuery)
    throw e
  }

  if (!(i % 5000)) console.log(`Inserted ${i} of ${voterFile.length}`)
})

const testSelectQuery = `
    SELECT *
    FROM ${table}
    LIMIT 2;`
console.log('testSelectQuery', testSelectQuery)
console.log(db.query(testSelectQuery).all())

const countQuery = `
    SELECT count(*)
    FROM ${table}`
// console.log('countQuery', countQuery)
console.log(db.query(countQuery).all())
