import axios from 'axios' // Axios for requests
import { useRouter } from 'next/router' // Router for URL params
import { useState } from 'react' // State management
import { RemainingCredits } from './RemainingCredits'
import { ProposalBlocks } from './ProposalBlocks'
import { useUser } from './useUser'
import { projects } from '../projects'

const eventHasEnded = false
const credits_per_voter = 100

export function QVInterface() {
  const router = useRouter()
  const { query } = router
  const { name } = useUser()
  const [submitting, setSubmitting] = useState(false) // Submission loading
  const [votes, setVotes] = useState<number[]>(projects.map(() => 0))
  const quadraticVotes = votes.map((itemVote, _) => itemVote ** 2)
  const totalQVUsed = quadraticVotes.reduce((a, b) => a + b, 0)
  const credits = credits_per_voter - totalQVUsed

  /**
   * Update votes array with QV weighted vote increment/decrement
   * @param {number} index of option to update
   * @param {boolean} increment true === increment, else decrement
   */
  const makeVote = (index: number, increment: boolean) => {
    const updatedVotes = [...votes]
    updatedVotes[index] += increment ? 1 : -1
    setVotes(updatedVotes)
  }

  /**
   * Toggle show/hide description
   * @param {number} key identifying the option the user clicked on
   */
  const toggleDescription = (key: number) => {
    const description = document.getElementById('description-container-' + key)
    const link = document.getElementById('link-container-' + key)
    const toggleButton = document.getElementById('toggle-button-' + key) as HTMLImageElement
    if (toggleButton.alt === 'down arrow') {
      toggleButton.src = '/vectors/up_arrow.svg'
      toggleButton.alt = 'up arrow'
    } else {
      toggleButton.src = '/vectors/down_arrow.svg'
      toggleButton.alt = 'down arrow'
    }
    if (description) {
      if (description.style.display === 'none') {
        description.style.display = 'block'
      } else {
        description.style.display = 'none'
      }
    }
    if (link) {
      if (link.style.display === 'none') {
        link.style.display = 'block'
      } else {
        link.style.display = 'none'
      }
    }
  }

  return (
    <div className="text-center vote">
      {/* Table of Contents */}
      <aside id="table-of-contents_container" className="text-white/80">
        <h3 className="w-full pb-1 pl-4 text-xs opacity-60">Jump to an Option</h3>
        <div className="sticky h-[calc(100vh-90px)] pb-4 overflow-y-auto border-t border-b border-white/50">
          {projects.map(([title], i) => (
            <a key={i} className="block w-full px-4 py-2 rounded text-decoration-none hover:bg-white/10" href={'#' + i}>
              <span className="text-xs opacity-60">{i + 1}.</span> {title}
            </a>
          ))}
        </div>
      </aside>
      {/* Budget Container */}
      <aside
        id="budget-container"
        className="sticky top-0 left-0 z-10 bg-eggplant-purple px-[2vw] pt-3 pb-2 text-white"
      >
        <RemainingCredits creditBalance={credits_per_voter} creditsRemaining={credits} />

        {/* Submit button */}
        {!eventHasEnded && (
          <button
            className="w-full py-3 mt-2.5 text-base text-fuchsia-100 font-bold bg-black rounded-md cursor-pointer hover:opacity-70"
            name="input-element"
            onClick={async () => {
              setSubmitting(true)

              return setTimeout(() => {
                setSubmitting(false)
                alert('Not active yet!')
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

      {/* Intro section */}
      <div className="ballot_container">
        <div className="vote__info">
          {/* General voting header */}
          <h1 className="text-3xl font-bold text-white">Place your votes</h1>
          <p className="text-[18px] leading-1.5 text-white/60">
            You can use up to <strong>{credits_per_voter} credits</strong>. Votes cost credits <sup>^ 2</sup>.
          </p>

          {/* Ballot */}
          <h2 className="mt-16 text-2xl font-bold text-left text-white border-b pb-[5px] border-[#e7eaf3]">
            Voteable Options
          </h2>
          <div>
            {projects.map(([title, Allocation_Amount, description], i) => {
              // Loop through each voteable option
              return (
                <div key={i} id={'' + i} className="event__option_item bg-white/5 text-white/80">
                  <div>
                    <button
                      style={{
                        gridTemplateColumns: '1fr auto',
                      }}
                      className="grid w-full p-4 text-left border-none rounded-md outline-none cursor-pointer hover:bg-white/10"
                      onClick={() => toggleDescription(i)}
                    >
                      <label className="col-start-1 text-sm cursor-pointer opacity-60">PROJECT {i + 1}</label>
                      <h3 className="col-start-1 text-xl font-bold my-0.5">{title}</h3>
                      <img id={`toggle-button-${i}`} src="/vectors/down_arrow.svg" alt="down arrow" />
                    </button>
                    {!!description && (
                      <div id={`description-container-${i}`} className="px-4 my-3">
                        <label className="text-sm opacity-60">Description</label>
                        <p className="whitespace-pre-wrap text-white/70">{description}</p>
                      </div>
                    )}
                  </div>
                  {votes[i] !== 0 ? <ProposalBlocks cost={votes[i] ** 2} /> : null}
                  <div className="event__option_item_vote">
                    <label>Votes</label>
                    <input type="number" value={votes[i]} disabled />
                    <div className="flex justify-between mt-3 item__vote_buttons">
                      {!eventHasEnded && (
                        <>
                          {/* 0 is min vote */}
                          {votes[i] > 0 ? (
                            <button
                              name="input-element"
                              className="text-black hover:opacity-80 active:opacity-90 bg-fuchsia-200"
                              onClick={() => makeVote(i, false)}
                            >
                              -
                            </button>
                          ) : (
                            <button className="button__disabled" disabled>
                              -
                            </button>
                          )}
                          {/* Enough credits remaining? */}
                          {credits >= (votes[i] + 1) ** 2 - votes[i] ** 2 ? (
                            <button
                              className="bg-black hover:opacity-70 hover:text-fuchsia-300 text-fuchsia-200 active:opacity-90"
                              name="input-element"
                              onClick={() => makeVote(i, true)}
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
      </div>
      {/* Component scoped CSS */}
      <style jsx>{`
        button {
          touch-action: manipulation;
        }

        .vote__info {
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

          .vote__info {
            grid-column: 1;
            margin: 50px 0 50px auto;
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

          .vote__info {
            margin: 50px 0 50px auto;
            width: auto;
          }
        }

        .event__option_item {
          border-radius: 8px;
          border: 1px solid #f1f2e5;
          box-shadow: 0 0 35px rgba(127, 150, 174, 0.125);
          max-width: 700px;
          width: 100%;
          margin: 25px 0px;
          text-align: left;
        }

        .event__option_item label {
          display: block;
          text-transform: uppercase;
        }

        .event__option_item input {
          width: 100%;
          font-size: 18px;
          border-radius: 5px;
          border: 1px solid #f1f2e5;
          padding: 10px 5px;
          background-color: #fff;
        }

        .event__option_item_vote {
          border-top: 2px solid #e7eaf3;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          padding: 15px;
        }

        .event__option_item_vote input {
          text-align: center;
          padding-left: 20px;
          font-weight: bold;
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
