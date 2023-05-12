import { importReviewed, saveReviewed } from './import-reviewed'

const entries = importReviewed()
console.log(entries.length)
// console.log(entries.slice(0, 3))

// Track names seen so far
const names: Record<string, string> = {}
entries.forEach((e, i) => {
  if (names[e.name]) entries[i].dupe_of = names[e.name]
  names[e.name] = e.number
})
// console.log(entries)

saveReviewed(entries)
