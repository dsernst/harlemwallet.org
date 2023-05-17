// Import voter file
import { Database } from 'bun:sqlite'
const db = new Database(__dirname + '/db.sqlite')
const table = 'd9_voters'

// Grab the current list of registrants
import registrations from '../db/registrations.json'

// For each registrants
for (let index = 1; index <= registrations.length; index++) {
  const r = registrations[index + 1]

  // Have we identified their VSN?
  if (!r.found_vsn) {
    console.log(`${index}. Skipping ${r.name}: No VSN`)
    continue
  }

  // Skip if already saved an address
  if (r.lobAddress) {
    console.log(`${index}. Skipping ${r.name}: Already has Lob address`)
    continue
  }

  // Find their voter file via VSN:
  const voterFileRecord = db
    .query(
      `select * from ${table} where
      VSN = "${r.found_vsn}"`
    )
    .all()[0] as Record<string, string>
  if (!voterFileRecord) {
    console.log(`${index}. Error finding ${r.name} via VSN ${r.found_vsn}`)
    continue
  }
  const CAPSFirstName = voterFileRecord.FirstName

  // Store address in Lob Address Book
}
