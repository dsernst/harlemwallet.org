import fs from 'node:fs'

// Get the current list
const file = fs.readFileSync(__dirname + '/group-1.csv', 'utf8')
const [headers, ...entries] = file.split('\n')

let content = headers + ',dupe_of,found_VSN,notes' + '\n'

// Stitch the mailing address field back together
entries.forEach((e) => {
  const [number, id, name, ...rest] = e.split(',')
  content += [number, id, name, `"${rest.join(',')}"`].join(',') + ',,,\n'
})

fs.writeFileSync(__dirname + '/reviewed-1.csv', content)
