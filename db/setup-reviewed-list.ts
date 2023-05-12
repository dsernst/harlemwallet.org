import fs from 'node:fs'

// We'll convert the separator to tabs to avoid the trouble with commas in the mailing_address

// Get the current list
const file = fs.readFileSync(__dirname + '/group-1.csv', 'utf8')
const [headersRow, ...entries] = file.split('\n')

// Add our new review columns
const headers = (headersRow + ',dupe_of,found_VSN,notes').split(',')

let content = headers.join('\t') + '\n'

// Stitch the mailing address field back together
entries.forEach((entry) => {
  const [number, id, name, ...rest] = entry.split(',')
  content += [number, id, name, rest.join(',')].join('\t') + '\t\t\t\n'
})

fs.writeFileSync(`${process.env.HOME}/Desktop/harlem-data/reviewed-1.tsv`, content)
