import registrations from './registrations.json'

const wAuth = registrations.filter((r) => r.authCode)

console.log(wAuth.length)
const seen = new Set()
wAuth.forEach((r) => {
  if (seen.has(r.authCode)) throw `non-unique authCode ${r.authCode}`
  seen.add(r.authCode)
})
