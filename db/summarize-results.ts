import data from './registrations.json'
import UAParser from 'ua-parser-js'

const formatted: string[] = []

data.forEach((r) => {
  if (!r.submission) return

  const time = new Date(r.submission[0].createdAt._seconds * 1000)
  const { votes } = r.submission[0]

  const credits = votes.map((v) => v ** 2)
  const total_credits = credits.reduce((a, b) => a + b, 0)

  const ua = UAParser(r.submission[0].headers['user-agent'])

  const browser = `${ua.browser.name} ${ua.browser.version}`
  const os = `${ua.os.name} ${ua.os.version}`
  const device = `${ua.device.model || ua.device.vendor}`

  formatted.push([time, r.authCode, total_credits, votes.join('\t'), browser, os, device].join('\t'))
})
console.log(formatted.join('\n'))

// console.log(data[0])
