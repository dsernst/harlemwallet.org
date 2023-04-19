import type { NextPage } from 'next'
import Head from 'next/head'
import { RegistrationForm } from '../src/RegistrationForm'

const Home: NextPage = () => {
  return (
    <div className="absolute inset-0 min-h-screen py-2 overflow-scroll bg-eggplant-purple">
      <Head>
        <title>Harlem Wallet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full max-w-3xl p-6 mx-auto text-center text-white">
        {/* Title */}
        <h1 className="text-3xl font-bold text-shadow shadow-black font-body">
          The Community Wallet: Bringing Economic Democracy to Harlem
        </h1>

        {/* Intro section */}
        <div className="mt-5 space-y-6 text-xl text-left text-shadow-sm shadow-black font-body">
          <p>Hello District 9!</p>
          <p>
            Councilmember Kristin Jordan is experimenting with a new process to
            get input from her constituents on the annual capital budget
            allocation. This year's pilot will be non-binding. Your feedback
            will test and refine the process to give our district a powerful new
            democratic tool to make public funding decisions in a more equitable
            and inclusive manner.
          </p>
          <p>
            To participate, please register below and you will receive a
            postcard with a unique code that you can use to verify your
            residency in District 9.
          </p>

          <p className="text-lg italic">Please register to join the pilot:</p>
        </div>

        {/* Registration Form */}
        <RegistrationForm />

        <footer className="mt-8 text-xs">
          <a
            target="_blank"
            className="text-white font-body hover:underline"
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
