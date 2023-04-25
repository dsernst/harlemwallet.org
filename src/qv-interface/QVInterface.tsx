import axios from 'axios' // Axios for requests
import { useRouter } from 'next/router' // Router for URL params
import { useState } from 'react' // State management
import { RemainingCredits } from './RemainingCredits'
import { ProposalBlocks } from './ProposalBlocks'
import { useUser } from './useUser'
import { projects } from '../projects'
import DownArrow from './down_arrow.svg'
import Image from 'next/image'

const eventHasEnded = false
const creditsPerVoter = 100

export function QVInterface() {
  const router = useRouter()
  const { query } = router
  const { name } = useUser()
  const [submitting, setSubmitting] = useState(false) // Submission loading
  const [votes, setVotes] = useState(projects.map(() => 0))
  const [descShown, setDescShown] = useState(projects.map(() => true))
  const quadraticVotes = votes.map((itemVote, _) => itemVote ** 2)
  const totalQVUsed = quadraticVotes.reduce((a, b) => a + b, 0)
  const creditsRemaining = creditsPerVoter - totalQVUsed

  /** Update votes array with QV weighted vote increment/decrement */
  const updateVotes = (index: number, increment: boolean) => {
    const updatedVotes = [...votes]
    updatedVotes[index] += increment ? 1 : -1
    setVotes(updatedVotes)
  }

  return (
    <div className="mt-6 text-center vote">
      {/* Table of Contents */}
      <aside id="table-of-contents_container" className="text-white/80">
        <h3 className="w-full pb-1 pl-4 text-xs opacity-60">Jump to an Option</h3>
        <div className="sticky h-[calc(100vh-90px)] pb-4 overflow-y-auto border-t border-b border-white/50">
          {projects.map(([title], i) => (
            <a
              key={i}
              className="flex justify-between px-4 py-2 rounded text-decoration-none hover:bg-white/10"
              href={'#' + i}
            >
              <span>
                <span className="text-xs opacity-60">{i + 1}.</span> {title}{' '}
              </span>
              {!!votes[i] && <span className="relative pl-1 text-sm top-0.5 opacity-70">+{votes[i]}</span>}
            </a>
          ))}
        </div>
      </aside>
      {/* Budget Container */}
      <aside
        id="budget-container"
        className="sticky top-0 left-0 z-10 bg-eggplant-purple px-[2vw] pt-3 pb-2 text-white"
      >
        <RemainingCredits {...{ creditsPerVoter, creditsRemaining }} />

        {/* Submit button */}
        {!eventHasEnded && (
          <button
            className="w-full py-3 mt-1 text-base font-bold bg-black rounded-md cursor-pointer text-fuchsia-100 hover:opacity-70"
            name="input-element"
            onClick={async () => {
              setSubmitting(true)

              return setTimeout(() => {
                setSubmitting(false)
                alert('Not active yet :)')
              }, 400)

              // POST data and collect status
              const { status } = await axios.post('/api/events/vote', {
                id: query.user, // Voter ID
                votes: votes, // Vote data
                name: name, // Voter name
              })

              // If POST is a success
              if (status === 200) {
                // Redirect to success page
                router.push(`success?user=${query.user}`)
              } else {
                // Else, redirect to failure page
                router.push(`failure?user=${query.user}`)
              }

              // Toggle button loading state to false
              setSubmitting(false)
            }}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Votes'}
          </button>
        )}
      </aside>

      <div className="mx-auto ballot_container">
        {/* Ballot */}
        <h2 className="mt-8 text-2xl font-bold text-left text-white border-b pb-[5px] border-[#e7eaf3]">
          Voteable Options
        </h2>
        <div>
          {projects.map(([title, allocation, description], i) => {
            // Loop through each voteable option
            return (
              <div
                key={i}
                id={'' + i}
                className="w-full max-w-[700px] my-6 text-left border border-fuchsia-300/40 rounded-lg shadow-md  bg-white/5 text-white/80 event__option_item"
              >
                <div>
                  <button
                    style={{
                      gridTemplateColumns: '1fr auto',
                    }}
                    className="grid w-full p-4 text-left border-none rounded-md outline-none cursor-pointer hover:bg-white/10"
                    onClick={() => {
                      const update = [...descShown]
                      update[i] = !update[i]
                      setDescShown(update)
                    }}
                  >
                    <label className="col-start-1 text-sm cursor-pointer opacity-60">PROJECT {i + 1}</label>
                    <h3 className="col-start-1 text-xl font-bold pr-8 my-0.5">{title}</h3>
                    <Image
                      src={DownArrow}
                      alt={`${descShown[i] ? 'down' : 'up'} arrow`}
                      className={`invert ${!descShown[i] && 'rotate-180'}`}
                    />
                  </button>
                  {descShown[i] && (
                    <div className="px-4 my-2">
                      <p className="mb-2 text-white/70">
                        <span className="block text-sm opacity-60">BUDGET</span> ${allocation.toLocaleString()}
                      </p>

                      <label className="text-sm opacity-60">DESCRIPTION</label>
                      <p className="whitespace-pre-wrap text-white/70">{description}</p>
                    </div>
                  )}
                </div>
                {<ProposalBlocks votes={votes[i]} />}
                <div className="p-4 border-t-2 border-fuchsia-300/20">
                  <label className="block mb-0.5 text-sm opacity-80">VOTES</label>
                  <input
                    className="py-2 pl-5 w-full pr-1 font-bold text-center text-[18px] rounded-md"
                    type="number"
                    value={votes[i]}
                    disabled
                  />
                  <div className="flex justify-between mt-3 item__vote_buttons">
                    {!eventHasEnded && (
                      <>
                        {/* 0 is min vote */}
                        {votes[i] > 0 ? (
                          <button
                            name="input-element"
                            className="text-black hover:opacity-80 active:opacity-90 bg-fuchsia-200"
                            onClick={() => updateVotes(i, false)}
                          >
                            -
                          </button>
                        ) : (
                          <button className="button__disabled" disabled>
                            -
                          </button>
                        )}
                        {/* Enough credits remaining? */}
                        {creditsRemaining >= (votes[i] + 1) ** 2 - votes[i] ** 2 ? (
                          <button
                            className="bg-black hover:opacity-70 hover:text-fuchsia-300 text-fuchsia-200 active:opacity-90"
                            name="input-element"
                            onClick={() => updateVotes(i, true)}
                          >
                            +
                          </button>
                        ) : (
                          <button className="button__disabled" disabled>
                            +
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* Component scoped CSS */}
      <style jsx>{`
        button {
          touch-action: manipulation;
        }

        .ballot_container {
          max-width: 660px;
          width: calc(100% - 40px);
          padding: 0px 20px;
          display: inline-block;
          position: relative;
        }

        #table-of-contents_container {
          display: none;
        }

        @media only screen and (min-width: 768px) {
          .vote {
            display: grid;
            grid-template-columns: 1fr auto;
          }

          .ballot_container {
            grid-row: 1;
          }

          #budget-container {
            background: none;
            grid-column: 2;
            position: sticky;
            height: 100vh;
            padding: 50px 2rem;
          }
        }

        @media only screen and (min-width: 1150px) {
          .vote {
            display: grid;
            grid-template-columns: [margin] 2rem [column] 1fr repeat(9, [gutter] 2rem [column] 1fr) [margin] 2rem;
          }

          #budget-container {
            grid-column-start: column 9;
            grid-column-end: gutter 10;
          }

          #table-of-contents_container {
            grid-row: 1;
            grid-column-start: 1;
            grid-column-end: gutter 2;
            display: inline-block;
            position: sticky;
            top: 0;
            height: 100vh;
            padding: 50px 2rem 0px;
            text-align: left;
          }

          .ballot_container {
            grid-column-start: column 3;
            grid-column-end: gutter 8;
          }
        }

        .item__vote_buttons > button {
          width: 49%;
          font-size: 22px;
          font-weight: bold;
          border-radius: 5px;
          border: none;
          transition: 50ms ease-in-out;
          padding: 5px 0px;
          cursor: pointer;
        }

        .button__disabled {
          background-color: #f1f2e5 !important;
          color: #000 !important;
          cursor: not-allowed !important;
        }
      `}</style>
    </div>
  )
}
