import registrations from './registrations.json'

const wAuth = registrations.filter((r) => r.authCode)
console.log(wAuth.length)

const seen = new Set()
wAuth.forEach((r) => {
  if (seen.has(r.authCode)) throw `non-unique authCode ${r.authCode}`
  seen.add(r.authCode)
})

const seenVsn = new Set()
wAuth.forEach((r) => {
  if (!r.found_VSN) return
  if (seenVsn.has(r.found_VSN)) console.log(`non-unique VSN ${r.found_VSN} ${r.name}`)
  seenVsn.add(r.found_VSN)
})
