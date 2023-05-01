import type { NextPage } from 'next'
import Head from 'next/head'
import { QVInterface } from '../src/qv-interface/QVInterface'
import { LogInForm } from '../src/qv-interface/LogInForm'

/** Toggle show/hide full instructions */
const toggleInstructions = () => {
  const collapsible = document.getElementById('collapsible') as HTMLElement;
  const button = document.getElementById('toggle-button') as HTMLButtonElement;

  collapsible.classList.toggle('hidden');
  button.textContent = collapsible.classList.contains('hidden') ? 'Show full instructions' : 'Collapse full instructions';
}

const VoicePage: NextPage = () => {
  return (
    <div className="absolute inset-0 min-h-screen overflow-scroll bg-eggplant-purple">
      <Head>
        <title>Harlem Wallet: Participate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Title */}
      <div className="pt-6 mx-auto font-bold text-center text-white text-shadow shadow-black font-body">
        <h1 className="text-2xl">The Community Wallet</h1>
        <h2 className="text-xl">Bringing Economic Democracy to Harlem</h2>
      </div>

      <div className="summary-text text-[18px] leading-1.5 text-white/60">
        <p>Welcome to this pilot of the Harlem Community Wallet participatory budgeting process! Below, you will see a list of spending proposals for District 9. If you want to express support for a spending proposal, click “+”. You can cast more than one vote for a spending proposal by clicking “+” multiple times. If you change your mind, just click “-” to take back votes.</p>
        <div id="collapsible" className="hidden">
          <p className="mt-4">Placing votes costs voice credits. When you run out of voice credits, you can’t place any more votes. The cost increases as you add more votes to a single option. So one vote costs 1 credit, two votes cost 4 credits, three votes cost 9 credits, and so on. This means that if you want to strongly support a proposal you can, but it will be very expensive.</p>
          <p className="mt-4">Spread your votes across all the options that you want to support. When you are finished, click the Submit button to finalize your votes. Your votes will be added up with everyone else’s, resulting in a clear and detailed representation of the group’s preferences.</p>
          <iframe
            className="mt-4 mx-auto"
            width="560" 
            height="315"
            src="https://www.youtube.com/embed/2a_kz1ReYXU"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          >
          </iframe>
        </div>
        <button
          id="toggle-button"
          className="mt-4 hover:opacity-80"
          onClick={() => toggleInstructions()}
        >
          <span>Show Full Instructions</span>
        </button>
      </div>

      <LogInForm />

      {/* Intro section */}
      <div className="mt-10 text-center">
        <h1 className="text-3xl font-bold text-white">Place your votes</h1>
        <p className="text-[18px] leading-1.5 text-white/60">
          You can use up to <strong className="text-white/70">{100} credits</strong>. <br />
        </p>
      </div>

      <QVInterface />

      <footer className="my-8 text-xs text-center">
        <a target="_blank" className="text-white font-body hover:underline" href="/privacy-policy">
          Privacy Policy
        </a>
      </footer>
      {/* Component scoped CSS */}
      <style jsx>{`
        .summary-text {
          text-align: center;
          margin: 1.5rem 2rem;
        }

        @media only screen and (min-width: 768px) {
          .summary-text {
            text-align: left;
            max-width: 700px;
            margin: 1.5rem auto;
          }
        }
      `}</style>
    </div>
  )
}

export default VoicePage
