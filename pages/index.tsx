import type { NextPage } from 'next'
import Head from 'next/head'
import { RegistrationForm } from '../src/RegistrationForm'

const Home: NextPage = () => {
  return (
    <div className="absolute inset-0 min-h-screen py-2 overflow-scroll from-white to-gray-100 bg-gradient-to-br">
      <Head>
        <title>Harlem Wallet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full max-w-3xl p-6 mx-auto text-center">
        {/* Title */}
        <h1 className="text-5xl font-bold">Harlem Wallet</h1>

        {/* Intro section */}
        <div className="mt-5 space-y-6 text-2xl text-left">
          <p>
            NYC Councilmember Kristin Jordan (D-9) is piloting a new initiative
            for constituents to join participatory budgeting for the district.
          </p>

          <p className="text-base">
            In Spring 2023, all participants will be mailed a postcard with a
            unique code to verify their residency.
          </p>

          <p className="text-lg italic">Please register to join the pilot:</p>
        </div>

        {/* Registration Form */}
        <RegistrationForm />
      </main>
    </div>
  )
}

export default Home
