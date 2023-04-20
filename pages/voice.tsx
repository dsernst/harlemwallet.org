import type { NextPage } from 'next'
import Head from 'next/head'
import { projects } from '../src/projects'

const total_allocation_amount = projects.reduce((sum, [_, amount]) => sum + amount, 0)

const VoicePage: NextPage = () => {
  return (
    <div className="absolute inset-0 min-h-screen py-2 overflow-scroll bg-eggplant-purple">
      <Head>
        <title>Harlem Wallet: Participate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full max-w-3xl p-6 mx-auto text-white">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-shadow shadow-black font-body">
          The Community Wallet: Bringing Economic Democracy to Harlem
        </h1>

        {/* Intro section */}
        <div className="my-8 space-y-6 text-xl text-left font-body">
          <p>Sign in form coming soon :)</p>
        </div>

        <h3 className="self-start mb-5 text-sm">
          Finalist Projects{' '}
          <span className="opacity-80">— Total Allocation Amount: ${total_allocation_amount.toLocaleString()}</span>
        </h3>

        <div>
          {projects.map(([Project_Title, Allocation_Amount, Project_Description], i) => (
            <div key={Project_Title} className="mb-6 text-white/80">
              <div>
                {i + 1}. <b className="text-white">{Project_Title}</b>{' '}
                <span className="text-sm">— ${Allocation_Amount.toLocaleString()}</span>
              </div>
              {Project_Description}
            </div>
          ))}
        </div>

        <footer className="mt-8 text-xs">
          <a target="_blank" className="text-white font-body hover:underline" href="/privacy-policy">
            Privacy Policy
          </a>
        </footer>
      </main>
    </div>
  )
}

export default VoicePage
