// Load Lob (snail-mail API)
import { Configuration, LettersApi } from '@lob/lob-typescript-sdk'
const config = new Configuration({ username: process.env.LOB_API_KEY })
const Letters = new LettersApi(config)

// Grab the current list of HarlemWallet registrants
import registrations from '../db/registrations.json'
import fs from 'node:fs'
let updatedRegistrations = [...registrations]

// For each registrants
const { data: sentLetters } = await Letters.list(50)
sentLetters?.forEach((letter) => {
  // console.log(letter)
  const desc = letter.to.description
  if (!desc) return // console.log('🟡 Skipping: no description')

  //   console.log(desc)
  const [, VSN] = desc.split('SN: ')
  const index = updatedRegistrations.findIndex((r) => r.found_VSN === VSN)
  if (index === -1) return console.log(' ❌ VSN no match:', VSN)

  const update = updatedRegistrations[index]

  update.sentLetter = letter.id
  updatedRegistrations[index] = update
})

console.log(updatedRegistrations.filter((r) => r.sentLetter).length)
fs.writeFileSync('./registrations.json', JSON.stringify(updatedRegistrations, null, 2))
