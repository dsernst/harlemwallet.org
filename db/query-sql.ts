import { Database } from 'bun:sqlite'
const db = new Database(__dirname + '/db.sqlite')
const table = 'd9_voters'

// const getAllQuery = `
//     SELECT *
//     FROM ${table}`
// console.log('getAllQuery', getAllQuery)
// console.log(db.query(getAllQuery).all())

const countQuery = `
    SELECT count(*)
    FROM ${table}
`
console.log('countQuery', countQuery)
console.log(db.query(countQuery).all())
