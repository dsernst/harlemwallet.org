import fs from 'node:fs'

const path = `${process.env.HOME}/Desktop/harlem-data/reviewed-1.tsv`

/** Grabs the current reviewed-1.tsv file & converts it into an array of objects */
export function importReviewed() {
  const file = fs.readFileSync(path, 'utf8')
  const [headersRow, ...entries] = file.split('\n')
  const headers = headersRow.split('\t').map((k) => k.trim())

  return entries.map((entry) => {
    const obj: Record<string, string> = {}
    entry.split('\t').forEach((cell, i) => (obj[headers[i]] = cell.trim()))
    return obj
  })
}
