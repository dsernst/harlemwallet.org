// Load Lob (snail-mail API)
import { Configuration, AddressesApi, AddressEditable } from '@lob/lob-typescript-sdk'
const config = new Configuration({ username: process.env.LOB_API_KEY })
const LobAddresses = new AddressesApi(config)

// Load official Registered Voters List
import { Database } from 'bun:sqlite'
const db = new Database(import.meta.dir + '/../db/db.sqlite')
const table = 'd9_voters'

// Grab the current list of HarlemWallet registrants
import registrations from '../db/registrations.json'
import fs from 'node:fs'
let updatedRegistrations = [...registrations]

// For each registrants
for (let index = 0; index < registrations.length; index++) {
  const r = registrations[index]
  const plus1 = index + 1

  // Have we identified their VSN?
  if (!r.found_VSN) {
    console.log(`${plus1}. Skipping ${r.name}: No VSN`)
    continue
  }

  // Skip if already saved an address
  if (r.lobAddress) {
    console.log(`${plus1}. Skipping ${r.name}: Already has Lob address`)
    continue
  }

  // Find their voter file record via VSN:
  type VFR = Record<string, string>
  const vfr = db.query(`select * from ${table} where VSN = "${r.found_VSN}"`).all()[0] as VFR
  if (!vfr) {
    console.log(`${plus1}. Error finding ${r.name} via VSN ${r.found_VSN}`)
    continue
  }

  // console.log(plus1, vfr)

  // Store address in Lob Address Book
  const address = await LobAddresses.create(
    new AddressEditable({
      description: `VSN: ${r.found_VSN}`,
      name: `${vfr.FirstName} ${vfr.LastName}`,
      address_line1: `${vfr.RegStreetNumber} ${vfr.RegStreetName}`,
      address_line2: vfr.RegUnitNumber,
      address_city: vfr.RegCity,
      address_state: 'NY',
      address_zip: vfr.RegZipCode,
    })
  )

  // Save the Lob ID to the local DB
  const updatedRecord = { ...r, lobAddress: address.id }
  // @ts-expect-error
  updatedRegistrations[index] = updatedRecord
  fs.writeFileSync('./registrations.json', JSON.stringify(updatedRegistrations, null, 2))
  console.log(`${plus1}. Saved address ${address.id}`)
}
