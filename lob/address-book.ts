import { Configuration, AddressesApi } from '@lob/lob-typescript-sdk'

const config: Configuration = new Configuration({
  username: process.env.LOB_API_KEY,
})

const addressApi = new AddressesApi(config)

const addressList = await addressApi.list(3)
console.log(addressList)
