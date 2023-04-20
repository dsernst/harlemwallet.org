import xlsx from 'node-xlsx'
import fs from 'fs'

// Parse xlsx file into memory
const workSheetFromFile = xlsx.parse(`${__dirname}/DEM_9CouncilDistrict.xlsx`)
const array = workSheetFromFile[0]
console.log(Object.keys(array))
console.log(array.name)
console.log(array.data.length)

// Write data into plaintext json
fs.writeFileSync('./db/d9-voters.json', JSON.stringify(array.data, null, 2))
