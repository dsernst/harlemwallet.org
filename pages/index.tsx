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
        <h1 className="text-3xl font-bold">
          The Community Wallet: Bringing Economic Democracy to Harlem
        </h1>

        {/* Intro section */}
        <div className="mt-5 space-y-6 text-xl text-left">
          <p>Hello District 9!</p>
          <p>
            This year Councilmember Kristin Jordan will conduct an open
            democratic process to guide her allocation of $2 million of the 2024
            capital budget.
          </p>
          <p>
            We hope this will be a better way for a larger number of Harlemites
            to make their funding priorities heard. To participate, please
            register below and you will be mailed a postcard with a unique code
            that you can use to verify your residency in District 9.
          </p>

          <p className="text-lg italic">Please register to join the pilot:</p>
        </div>

        {/* Registration Form */}
        <RegistrationForm />

        <footer className="mt-8 text-xs">
          <a
            target="_blank"
            className="text-blue-600 hover:underline"
            href="/privacy-policy"
          >
            Privacy Policy
          </a>
        </footer>
      </main>
    </div>
  )
}

export default Home
