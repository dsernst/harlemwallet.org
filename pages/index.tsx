import type { NextPage } from 'next'
import Head from 'next/head'
import { RegistrationForm } from '../src/RegistrationForm'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Harlem Wallet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full max-w-3xl px-20 text-center">
        {/* Title */}
        <h1 className="text-5xl font-bold">Harlem Wallet</h1>

        {/* Intro section */}
        <div className="mt-5 space-y-4 text-2xl text-left">
          <p>
            NYC Councilmember Kristin Jordan (D-9) is piloting a new initiative
            for constituents to join participatory budgeting for the district.
          </p>

          <p>
            Please register below to begin the process of joining the pilot.
          </p>
          <p className="text-base">
            In Spring 2023, all participants will be mailed a postcard with a
            unique code to verify their residency.
          </p>
        </div>

        {/* Registration Form */}
        <RegistrationForm />
      </main>
    </div>
  )
}

export default Home
