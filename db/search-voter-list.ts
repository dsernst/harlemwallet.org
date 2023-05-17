import { importReviewed, saveReviewed } from './import-reviewed'
const entries = importReviewed()

import { Database } from 'bun:sqlite'
const db = new Database(__dirname + '/db.sqlite')
const table = 'd9_voters'

const relevantKeys = {
  EmailAddress: 'EmailAddress',
  FirstName: 'FirstName',
  LastName: 'LastName',
  MiddleInitial: 'MiddleInitial',
  NameSuffix: 'NameSuffix',
  RegStreetName: 'RegStreetName',
  RegStreetNumber: 'RegStreetNumber',
  RegUnitNumber: 'RegUnitNumber',
  RegZipCode: 'RegZipCode',
  VSN: 'VSN',
}
const keys = Object.keys(relevantKeys).join(',')

let finds = 0

const foundVSNs = entries.map(function reviewRow(row) {
  if (row.notes) {
    console.log(`🧪 Skipped #${row['#']} ${row.name}: Note = '${row.notes}'`)
    return row
  }
  if (row.dupe_of) {
    console.log(`👤 Skipped #${row['#']} ${row.name}: Dupe of ${row.dupe_of}`)
    return row
  }

  // Look at example voter-file schema
  //   console.log(db.query(`select ${keys} from ${table} limit 1;`).all())

  const [first, last] = row.name.replace('Mr. ', '').split(' ')

  if (!last) {
    console.log(`🟡 Skipped #${row['#']} ${row.name}: Missing last name`)
    return row
  }

  const sameFirstAndLastName = db
    .query(
      `select ${keys} from ${table} where 
      FirstName = "${first.toUpperCase()}" and
      LastNAme = "${last?.toUpperCase()}"`
    )
    .all() as Record<keyof typeof relevantKeys, string>[]
  const onlyOneMatch = sameFirstAndLastName.length == 1
  // if (onlyOneMatch) console.log('✅ Found exactly one first & last name match')
  if (!sameFirstAndLastName.length) {
    console.log(`❌ #${row['#']} ${row.name}: No voter found with that name`)
    return row
  }

  if (/^\w+@\w+\.com$/i.test(row.mailing_address)) {
    console.log(`🟡 Skipped #${row['#']} ${row.name}: Gave email instead of mailing addr`)
    return row
  }

  if (row.mailing_address.includes('P.O. Box')) {
    console.log(`🟡 Skipped #${row['#']} ${row.name}: PO Box listed`)
    return row
  }

  const [streetNum, ...rest] = row.mailing_address.split(' ')
  let skip = false
  const good = sameFirstAndLastName.find(function reviewNameMatches(match, i) {
    // console.log(`Match #${i + 1}`, match)
    const streetNumMatch = streetNum.replace(',', '').split('-')[0].toUpperCase() === match.RegStreetNumber
    if (!streetNumMatch)
      return onlyOneMatch && console.log('❌ Street Num mismatch', streetNum, 'vs', match.RegStreetNumber)
    // console.log('✅ Street Num match')

    const addr_rest = rest.join(' ')

    // Regex to test for numeric streets like 'W 152nd St'
    const RE_w152nd_st = /^(w.?|west|east) ?(\d\d\d)(nd|th)? ?(st.|street|ave)?/i
    const first_regex_match = addr_rest.match(RE_w152nd_st)
    if (first_regex_match) {
      const [, eastWest, street, , streetType] = first_regex_match
      const streetName = `${eastWest.toLowerCase().startsWith('w') ? 'WEST' : 'EAST'} ${street} ${
        !streetType || streetType.toLowerCase().startsWith('st') ? 'STREET' : 'AVENUE'
      }`
      if (streetName !== match.RegStreetName)
        return console.log('❌ Street Names mismatch', streetName, 'vs', match.RegStreetName)
      return true
    }

    // Regex to test for generic avenue names
    const RE_Avenue = /^([\w ]+) Ave/i
    const second_regex_match = addr_rest.match(RE_Avenue)
    if (second_regex_match) {
      let [, street] = second_regex_match
      if (street === 'Fifth') street = '5'
      const streetName = `${street.replace('th', '').toUpperCase()} AVENUE`
      if (streetName !== match.RegStreetName)
        return console.log('❌ Street Names mismatch', streetName, 'vs', match.RegStreetName)
      return true
    }

    if (addr_rest.includes(match.RegUnitNumber)) {
      skip = true
      console.log(
        `🟡 Skipped #${row['#']} ${row.name}: VSN ${match.VSN} matches name, street num, unit num, but wrong street name`
      )
      return false
    }

    console.log('❌ No Street name regex could match:', addr_rest)
  })
  if (skip) return row
  if (good) {
    finds++
    console.log(`✅ Matched #${row['#']} ${row.name} to VSN ${good.VSN}`)
    return { ...row, found_VSN: good.VSN }
  }

  console.log(`\nFound ${finds} VSNs`)

  console.log('\nReviewing:', row)
  console.log('Name matches:', sameFirstAndLastName)
  throw `Don't know what to with this one`
})

console.log(`\nFound ${finds} VSNs`)

saveReviewed(foundVSNs)
