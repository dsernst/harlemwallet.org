import {
  Configuration,
  LetterEditable,
  LettersApi,
} from '@lob/lob-typescript-sdk'

const config: Configuration = new Configuration({
  username: process.env.LOB_API_KEY,
})

const letterCreate = new LetterEditable({
  to: 'adr_572d829ce2099f72', // Matt
  from: 'adr_f67b995a9422101e', // Councilmember's office
  color: false,
  use_type: 'operational',
  file: 'tmpl_1466f26633d3e5a',
  merge_variables: {
    name: 'Matt',
  },
})

try {
  const myLetter = await new LettersApi(config).create(letterCreate)
  console.log('myLetter:', myLetter)
} catch (err: any) {
  console.error(err)
}
