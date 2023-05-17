import type { NextApiRequest, NextApiResponse } from 'next'
import { firebase } from './_firebase'
import fs from 'node:fs'
import { pick } from '../../src/utils/pick'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.VERCEL) return res.status(401).send('Unauthorized')

  const db = firebase.firestore()
  const batch = db.batch()
  const registrations = db.collection('registrations')

  let results: unknown[] = []

  ;[1, 2, 3].map((i) =>
    importReviewed(`${process.env.HOME}/Desktop/harlem-data/reviewed-${i}.tsv`).forEach((entry) => {
      if (!entry.id) return

      const updatedFields = pick(entry, 'found_VSN', 'dupe_of', 'notes')
      results.push([entry.id, updatedFields])

      batch.update(registrations.doc(entry.id), updatedFields)
    })
  )

  results.push(batch.commit())

  return res.status(200).json({ results })
}

function importReviewed(path: string) {
  const file = fs.readFileSync(path, 'utf8')
  const [headersRow, ...entries] = file.split('\n')
  const headers = headersRow.split('\t').map((k) => k.trim())

  return entries.map((entry) => {
    const obj: Record<string, string> = {}
    entry.split('\t').forEach((cell, i) => (obj[headers[i]] = cell.trim()))
    return obj
  })
}
