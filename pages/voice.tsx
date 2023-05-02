import type { NextPage } from 'next'
import Head from 'next/head'
import { QVInterface } from '../src/qv-interface/QVInterface'
import { LogInForm } from '../src/qv-interface/LogInForm'
import { Instructions } from '../src/qv-interface/Instructions'

const VoicePage: NextPage = () => {
  return (
    <div className="bg-eggplant-purple">
      <Head>
        <title>Harlem Wallet: Participate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Title */}
      <div className="pt-6 mx-auto font-bold text-center text-white text-shadow shadow-black font-body">
        <h1 className="text-2xl">The Community Wallet</h1>
        <h2 className="text-xl">Bringing Economic Democracy to Harlem</h2>
      </div>

      <LogInForm />

      {/* Intro section */}
      <div className="mt-10 text-center">
        <h1 className="text-3xl font-bold text-white">Place your votes</h1>
        <p className="text-[18px] leading-1.5 text-white/60">
          You can use up to <strong className="text-white/70">{100} credits</strong>. <br />
        </p>
      </div>

      <Instructions />

      <QVInterface />

      <footer className="py-8 text-xs text-center">
        <a target="_blank" className="text-white font-body hover:underline" href="/privacy-policy">
          Privacy Policy
        </a>
      </footer>
    </div>
  )
}

export default VoicePage
