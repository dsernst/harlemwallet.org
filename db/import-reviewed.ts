import fs from 'node:fs'

const path = `${process.env.HOME}/Desktop/harlem-data/reviewed-1.tsv`

export function importReviewed() {
  const file = fs.readFileSync(path, 'utf8')
  const [headersRow, ...entries] = file.split('\n')
  const headers = headersRow.split('\t')

  return entries.map((entry) => {
    const obj: Record<string, string> = {}
    entry.split('\t').forEach((cell, i) => (obj[headers[i]] = cell))
    return obj
  })
}
