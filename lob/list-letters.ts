import { Configuration, LettersApi } from '@lob/lob-typescript-sdk'

const config: Configuration = new Configuration({
  username: process.env.LOB_API_KEY,
})

const letters = await new LettersApi(config).list(2)
console.log(letters)
