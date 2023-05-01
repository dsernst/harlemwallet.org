import { useReducer } from 'react'

export const Instructions = () => {
  const [collapsed, toggleCollapsed] = useReducer((c) => !c, true)

  return (
    <div className="max-w-2xl mx-8 my-6 text-lg text-center sm:text-left sm:mx-auto text-white/60">
      <p>
        Welcome to this pilot of the Harlem Community Wallet participatory budgeting process! Below, you will see a list
        of spending proposals for District 9. If you want to express support for a spending proposal, click “+”. You can
        cast more than one vote for a spending proposal by clicking “+” multiple times. If you change your mind, just
        click “-” to take back votes.
      </p>
      <div id="collapsible" className={collapsed ? `hidden` : ''}>
        <p className="mt-4">
          Placing votes costs voice credits. When you run out of voice credits, you can't place any more votes. The cost
          increases as you add more votes to a single option. So one vote costs 1 credit, two votes cost 4 credits,
          three votes cost 9 credits, and so on. This means that if you want to strongly support a proposal you can, but
          it will be very expensive.
        </p>
        <p className="mt-4">
          Spread your votes across all the options that you want to support. When you are finished, click the Submit
          button to finalize your votes. Your votes will be added up with everyone else's, resulting in a clear and
          detailed representation of the group's preferences.
        </p>

        {/* Video embed */}
        <iframe
          className="mx-auto mt-4"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/2a_kz1ReYXU"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <button className="mt-4 transition duration-75  hover:text-white/90" onClick={toggleCollapsed}>
        <span>{collapsed ? 'Show' : 'Collapse'} Full Instructions</span>
      </button>
    </div>
  )
}
