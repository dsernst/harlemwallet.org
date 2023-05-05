import type { NextPage } from 'next'
import Head from 'next/head'

import { Widget } from '@typeform/embed-react'

const SuccessPage: NextPage = () => {
  return (
    <div className="absolute inset-0 min-h-screen py-2 overflow-scroll bg-eggplant-purple">
      <Head>
        <title>Harlem Wallet: Thank You</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full max-w-3xl p-6 mx-auto text-center text-white">
        <h1 className="text-3xl font-bold text-shadow shadow-black font-body">Thank you!</h1>

        <div className="my-5 space-y-6 text-xl text-left ">
          <p>We would love your feedback on this experience.</p>
        </div>

        {/* Feedback Form */}
        <Widget id="aC2iWSFh" className="h-[32rem]" />

        <footer className="mt-8 text-xs">
          <a target="_blank" className="text-white font-body hover:underline" href="/privacy-policy">
            Privacy Policy
          </a>
        </footer>
      </main>
    </div>
  )
}

export default SuccessPage
