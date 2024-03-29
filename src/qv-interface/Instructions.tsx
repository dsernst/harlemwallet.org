import { useReducer } from 'react'
import { useWindowDimensions } from './useWindowDimensions'

export const Instructions = () => {
  const [collapsed, toggleCollapsed] = useReducer((c) => !c, true)
  const isMobile = useWindowDimensions().width <= 768

  return (
    <div className="relative my-10">
      {/* Instructions */}
      <div
        className={`max-w-2xl px-2 mx-8 my-6 space-y-4 overflow-y-hidden text-lg text-center sm:px-4 sm:text-left sm:mx-auto text-white/60 ${
          collapsed && 'h-24'
        }`}
      >
        {/* Video embed */}
        <iframe
          className="mx-auto"
          width={isMobile ? '100%' : '560px'}
          height={isMobile ? '175px' : '315px'}
          src="https://www.youtube.com/embed/legnmMzR134"
          title="Instructional video"
          allow="accelerometer; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <p>
          Welcome to this pilot of the Harlem Community Wallet participatory budgeting process! Below, you will see a
          list of spending proposals for District 9. If you want to express support for a spending proposal, click “+”.
          You can cast more than one vote for a spending proposal by clicking “+” multiple times. If you change your
          mind, just click “-” to take back votes.
        </p>
        <p>
          Placing votes costs voice credits. When you run out of voice credits, you can't place any more votes. The cost
          increases as you add more votes to a single option. So one vote costs 1 credit, two votes cost 4 credits,
          three votes cost 9 credits, and so on. This means that if you want to strongly support a proposal you can, but
          it will be very expensive.
        </p>
        <p>
          Spread your votes across all the options that you want to support. When you are finished, click the Submit
          button to finalize your votes. Your votes will be added up with everyone else's, resulting in a clear and
          detailed representation of the group's preferences.
        </p>
      </div>

      {/* Collapsible controls */}
      <div
        className={`w-full text-center -bottom-1 bg-gradient-to-b to-eggplant-purple from-eggplant-purple/20 ${
          collapsed && 'absolute pt-16'
        }`}
      >
        <button
          className="px-3 py-1 border rounded border-fuchsia-200/40 hover:border-fuchsia-200/70 bg-eggplant-purple text-white/75 hover:text-white/90"
          onClick={toggleCollapsed}
        >
          <span>{collapsed ? 'Show' : 'Collapse'} Full Instructions</span>
        </button>
      </div>
    </div>
  )
}
