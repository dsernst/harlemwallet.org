import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="absolute inset-0 min-h-screen py-2 overflow-scroll bg-eggplant-purple">
      <Head>
        <title>Harlem Wallet: Participate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full max-w-3xl p-6 mx-auto text-center text-white">
        {/* Title */}
        <h1 className="text-2xl font-bold text-shadow shadow-black font-body">
          The Community Wallet: Bringing Economic Democracy to Harlem
        </h1>

        {/* Intro section */}
        <div className="my-16 space-y-6 text-xl text-left font-body">
          <p>You've reached the participation page</p>
          <p>Sign in form coming soon :)</p>
        </div>

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
