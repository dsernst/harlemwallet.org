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

/** Saves the current reviewed-1.tsv file */
export function saveReviewed(entries: Record<string, string>[]) {
  const headers = Object.keys(entries[0])
  let content = headers.join('\t') + '\n'

  content += entries.map((entry) => headers.map((h) => entry[h]).join('\t')).join('\n')

  fs.writeFileSync(path, content)
}
