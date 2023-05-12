import fs from 'fs'

import registrations from './registrations.json'

// Split the list into thirds
const data = registrations
const totalItems = data.length
const split1 = Math.ceil(totalItems / 3)
const split2 = split1 * 2

// For each group
;[data.slice(0, split1), data.slice(split1, split2), data.slice(split2)].forEach((group, i) => {
  // Format each row
  const headers = ['number', 'id', 'name', 'mailing_address']
  const rows = group.map((item, index) => [index + 1, item.id, item.name, item.mailing_address])

  // Save all the data to a csv file
  const content = [headers, ...rows].map((row) => row.join(',')).join('\n')
  fs.writeFileSync(__dirname + `/group-${i + 1}.csv`, content)
})
