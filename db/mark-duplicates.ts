import { importReviewed, saveReviewed } from './import-reviewed'

const entries = importReviewed()
console.log(entries.length)
// console.log(entries.slice(0, 3))

// Track names seen so far
const names: Record<string, string> = {}
const dupesMarked = entries
  .reverse()
  .map((e) => {
    if (names[e.name]) return { ...e, dupe_of: names[e.name] }
    names[e.name] = e['#']
    return e
  })
  .reverse()
// console.log(dupesMarked)

saveReviewed(dupesMarked)
