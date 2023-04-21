import type { NextPage } from 'next'
import Head from 'next/head'
import { projects } from '../src/projects'
import { QVInterface } from '../src/qv-interface/QVInterface'

const total_allocation_amount = projects.reduce((sum, [_, amount]) => sum + amount, 0)

const VoicePage: NextPage = () => {
  return (
    <div className="absolute inset-0 min-h-screen overflow-scroll bg-eggplant-purple">
      <Head>
        <title>Harlem Wallet: Participate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full pt-6 mx-auto text-white">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-shadow shadow-black font-body">The Community Wallet</h1>
        <h2 className="text-xl font-bold text-center text-shadow shadow-black font-body">
          Bringing Economic Democracy to Harlem
        </h2>
      </main>

      <QVInterface />

      <footer className="my-8 text-xs text-center">
        <a target="_blank" className="text-white font-body hover:underline" href="/privacy-policy">
          Privacy Policy
        </a>
      </footer>
    </div>
  )
}

export default VoicePage
