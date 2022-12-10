import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Harlem Wallet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full px-20 text-center">
        <h1 className="text-5xl font-bold">Harlem Wallet</h1>

        <p className="mt-3 text-2xl">
          NYC Councilmember Kristin Jordan (D-9) is piloting a new initiative
          for constituents to join participatory budgeting for the district.
        </p>

        <p className="mt-3 text-2xl">
          To register, please provide your name, email address, and residential
          mailing address within the district. In Spring 2023, all participants
          will be mailed a postcard with a unique code to verify their
          residency.
        </p>
      </main>
    </div>
  )
}

export default Home
