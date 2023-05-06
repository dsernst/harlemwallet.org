import { Configuration, LetterEditable, LettersApi } from '@lob/lob-typescript-sdk'
// @ts-ignore (local file only)
import registrations from '../db/registrations.json'

const template = {
  live: 'tmpl_2f55b559c7834a4',
  test: 'tmpl_ce09b2de72a4ae9',
}
const councilMembersOffice = 'adr_f67b995a9422101e'
const councilMembersOfficeTest = 'adr_54e8aa9c860fc502'
// const mattsAddress = 'adr_572d829ce2099f72'

const testUsers = registrations.filter((r) => r.authCode?.startsWith('DEMO'))
// console.log(testUsers.length)
for (let index = 0; index < testUsers.length; index++) {
  const testUser = testUsers[index]
  // console.log(testUser.name)

  try {
    const letters = new LettersApi(new Configuration({ username: process.env.LOB_TEST_API_KEY }))
    const myLetter = await letters.create(
      new LetterEditable({
        to: councilMembersOfficeTest,
        from: councilMembersOfficeTest,
        color: false,
        use_type: 'operational',
        file: template.test,
        merge_variables: {
          first_name: testUser.name.split(' ')[0],
          code: testUser.authCode,
        },
      })
    )
    console.log('myLetter:', myLetter)
  } catch (err: any) {
    console.error(err)
  }
}
