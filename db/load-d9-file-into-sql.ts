import { Database } from 'bun:sqlite'
const db = new Database(__dirname + '/db.sqlite')
const table = 'd9_voters'

// Load json file of all voters
import d9Voters from './d9-voters.json'
const voters = d9Voters as string[][]
console.log(`Loaded voter file: ${voters.length} rows\n`)

// Get column names
const columns = voters[0]
console.log('columns', columns)

// Grab a random row for testing
const randRow = voters[Math.floor(Math.random() * voters.length)]
console.log('randRow', randRow)

// Drop the table to restart the db
console.log(db.query(`drop table ${table}`).all())

// Create the SQLite table
const createTableQuery = `
  create table ${table} (
      ${columns.map((column) => `${column} text`).join(', ')},
      primary key (VSN)
  )
`
console.log('createTableQuery', createTableQuery)
console.log(db.query(createTableQuery).all())

// Insert row into the SQLite table
// const query = db.query('INSERT INTO voters (name, party) VALUES (?, ?)')
const insertQuery = `
  insert into ${table}
    (${columns.join(', ')}) values
    (${randRow.map((v) => (v ? `'${v}'` : 'null')).join(', ')})
`
console.log('insertQuery', insertQuery)
console.log(db.query(insertQuery).all())

const getAllQuery = `
    SELECT *
    FROM ${table}
`
console.log('getAllQuery', getAllQuery)
console.log(db.query(getAllQuery).all())

// db.run(createTableQuery)

// Close the database connection
db.close()
