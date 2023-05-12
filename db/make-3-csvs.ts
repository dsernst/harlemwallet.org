import fs from 'fs'

import registrations from './registrations.json'
type Item = (typeof registrations)[0]

function splitIntoGroups(data: Item[]) {
  const totalItems = data.length
  const firstSplit = Math.ceil(totalItems / 3)
  const secondSplit = firstSplit * 2

  return [data.slice(0, firstSplit), data.slice(firstSplit, secondSplit), data.slice(secondSplit)]
}

function convertToCSV(data: Item[]): string {
  const headers = ['number', 'id', 'name', 'mailing_address']
  const rows = data.map((item, index) => [index + 1, item.id, item.name, item.mailing_address])

  return [headers, ...rows].map((row) => row.join(',')).join('\n')
}

function createCSVFile(filename: string, data: string): void {
  fs.writeFileSync(filename, data)
}

// Save each group to a file
splitIntoGroups(registrations).forEach((group, i) =>
  createCSVFile(__dirname + `/group-${i + 1}.csv`, convertToCSV(group))
)
