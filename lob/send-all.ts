// Load Lob (snail-mail API)
import { Configuration, LetterEditable, LettersApi } from '@lob/lob-typescript-sdk'
const config = new Configuration({ username: process.env.LOB_API_KEY })
const Letters = new LettersApi(config)

// Load official Registered Voters List
import { Database } from 'bun:sqlite'
const db = new Database(import.meta.dir + '/../db/db.sqlite')
const table = 'd9_voters'

// Grab the current list of HarlemWallet registrants
import registrations from '../registrations.json'
import fs from 'node:fs'
let updatedRegistrations = [...registrations]

// Lob Stored Values
const letterTemplate = 'tmpl_2f55b559c7834a4'
const councilMembersOffice = 'adr_f67b995a9422101e'

const titleCase = (str: string) => str[0].toUpperCase() + str.slice(1).toLowerCase()

let sent = 0

// For each registrants
for (let index = 0; index < registrations.length; index++) {
  const r = registrations[index]
  const plus1 = index + 1

  // Confirm required fields
  if (!r.found_VSN) continue
  if (!r.lobAddress) continue
  if (!r.authCode) continue
  if (r.sentLetter) continue

  // Find their voter file record via VSN:
  type VFR = Record<string, string>
  const vfr = db.query(`select * from ${table} where VSN = "${r.found_VSN}"`).all()[0] as VFR

  // To send just a small # at first, to make sure everything is working
  if (sent > 0) continue
  sent++

  // Trigger the send
  const sentLetter = (
    await Letters.create(
      new LetterEditable({
        to: r.lobAddress,
        from: councilMembersOffice,
        color: false,
        use_type: 'operational',
        file: letterTemplate,
        merge_variables: {
          first_name: titleCase(vfr.FirstName),
          code: r.authCode,
        },
      })
    )
  ).id

  // Save the Lob ID to the local DB
  const updatedRecord = { ...r, sentLetter }
  updatedRegistrations[index] = updatedRecord
  fs.writeFileSync('./registrations.json', JSON.stringify(updatedRegistrations, null, 2))
  console.log(`${plus1}. Sent letter ${sentLetter}`)

  // Run /api/save-letterSent after to update the DB
}

console.log('Sent:', sent)
