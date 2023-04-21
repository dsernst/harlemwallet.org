import axios from 'axios' // Axios for requests
import { Loader } from './Loader' // Placeholder loader
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
   * Vote submission POST
   */
  const submitVotes = async () => {
    // Toggle button loading state to true
    setSubmitting(true)

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
    <div className="vote">
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
      <aside id="budget-container">
        <RemainingCredits creditBalance={credits_per_voter} creditsRemaining={credits} />

        {/* Submit button */}
        {!eventHasEnded && (
          <>
            {/* Submission button states */}
            {submitting ? (
              <button className="submit__button" disabled>
                <Loader />
              </button>
            ) : (
              // Else, enable submission
              <button name="input-element" onClick={submitVotes} className="submit__button">
                Submit Votes
              </button>
            )}
          </>
        )}
      </aside>

      {/* Intro section */}
      <div className="ballot_container">
        <div className="vote__info">
          {/* General voting header */}
          <div className="vote__info_heading">
            <h1 className="text-white">Place your votes</h1>
            <p>
              You can use up to <strong>{credits_per_voter} credits</strong> to vote during this event.
            </p>
          </div>

          {/* Ballot */}
          <div className="event__options">
            <h2>Voteable Options</h2>
            <div className="divider" />
            <div className="event__options_list">
              {projects.map(([title, Allocation_Amount, description], i) => {
                // Loop through each voteable option
                return (
                  <div key={i} id={'' + i} className="event__option_item bg-white/5">
                    <div>
                      <button className="title-container" onClick={() => toggleDescription(i)}>
                        <label>Title</label>
                        <h3>{title}</h3>
                        <img id={`toggle-button-${i}`} src="/vectors/down_arrow.svg" alt="down arrow" />
                      </button>
                      {!!description && (
                        // If description exists, show description
                        <div id={`description-container-${i}`}>
                          <label>Description</label>
                          <p className="event__option_item_desc">{description}</p>
                        </div>
                      )}
                    </div>
                    {votes[i] !== 0 ? <ProposalBlocks cost={votes[i] ** 2} /> : null}
                    <div className="event__option_item_vote">
                      <label>Votes</label>
                      <input type="number" value={votes[i]} disabled />
                      <div className="item__vote_buttons">
                        <>
                          {eventHasEnded ? (
                            <></>
                          ) : (
                            <>
                              {/* 0 is min vote */}
                              {votes[i] > 0 ? (
                                <button name="input-element" onClick={() => makeVote(i, false)}>
                                  -
                                </button>
                              ) : (
                                <button className="button__disabled" disabled>
                                  -
                                </button>
                              )}
                              {/* Enough credits remaining? */}
                              {credits >= (votes[i] + 1) ** 2 - votes[i] ** 2 ? (
                                <button name="input-element" onClick={() => makeVote(i, true)}>
                                  +
                                </button>
                              ) : (
                                <button className="button__disabled" disabled>
                                  +
                                </button>
                              )}
                            </>
                          )}
                        </>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Component scoped CSS */}
      <style jsx>{`
        button {
          touch-action: manipulation;
        }
        .vote {
          text-align: center;
        }

        .vote__info {
          max-width: 660px;
          width: calc(100% - 40px);
          margin: 50px 0px;
          padding: 0px 20px;
          display: inline-block;
          position: relative;
        }

        #budget-container {
          padding: 1vw 2vw;
          position: sticky;
          top: 0;
          left: 0;
          z-index: 1;
          background: white;
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
            top: 0;
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

        .vote__info_heading > h1 {
          margin: 0px;
        }

        .event__options {
          margin-top: 60px;
          text-align: left;
        }

        .event__options > h2 {
          color: #000;
          margin-block-end: 0px;
        }

        .divider {
          border-top: 1px solid #e7eaf3;
          margin-top: 5px;
        }

        .vote__info_heading > p {
          font-size: 18px;
          line-height: 150%;
          color: #80806b;
          margin: 0px;
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

        .event__option_item > div:nth-child(1) {
          padding: 15px;
        }

        .event__option_item label {
          display: block;
          color: #000;
          font-size: 18px;
          text-transform: uppercase;
        }

        .event__option_item > div > div {
          margin: 25px 0px;
        }

        .title-container {
          display: grid;
          grid-template-columns: 1fr auto;
          font-family: suisse_intlbook;
          padding: 0px;
          outline: none;
          width: 100%;
          border-radius: 5px;
          background-color: #fff;
          transition: 100ms ease-in-out;
          border: none;
          cursor: pointer;
        }

        .title-container > label,
        .title-container > h3 {
          grid-column-start: 1;
          text-align: left;
          display: block;
          color: #000;
          font-size: 18px;
        }

        .title-container > label {
          text-transform: uppercase;
        }

        .event__option_item > div > div:nth-child(1) {
          margin-top: 5px;
        }

        .event__option_item > div > div:nth-last-child(1) {
          margin-bottom: 5px;
        }

        .event__option_item h3 {
          margin: 2px 0px;
        }

        .event__option_item p {
          margin-top 5px;
        }

        .event__option_item a {
          text-decoration: none;
        }

        .event__option_item input {
          width: calc(100% - 10px);
          font-size: 18px;
          border-radius: 5px;
          border: 1px solid #f1f2e5;
          padding: 10px 5px;
          background-color: #fff;
        }

        .event__option_item_desc {
          color: #666;
          white-space: pre-wrap;
        }

        .event__option_item_vote {
          border-top: 2px solid #e7eaf3;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          padding: 15px;
        }

        .event__option_item_vote input {
          text-align: center;
          font-weight: bold;
        }

        .item__vote_buttons {
          margin: 10px 0px 0px 0px !important;
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
          color: #fff;
        }

        .item__vote_buttons > button:nth-child(1) {
          margin-right: 1%;
          background-color: #edff38;
          color: #000;
        }

        .item__vote_buttons > button:nth-child(2) {
          margin-left: 1%;
          background-color: #000;
          color: #edff38;
        }

        .item__vote_buttons > button:hover {
          opacity: 0.8;
        }

        .button__disabled {
          background-color: #f1f2e5 !important;
          color: #000 !important;
          cursor: not-allowed !important;
        }

        .item__vote_credits {
          color: #80806b;
          font-size: 14px;
          text-align: right;
          display: block;
          transform: translateY(-7.5px);
        }

        .submit__button {
          padding: 12px 0px;
          width: 100%;
          display: inline-block;
          border-radius: 5px;
          background-color: #000;
          color: #edff38;
          font-size: 16px;
          transition: 100ms ease-in-out;
          border: none;
          cursor: pointer;
          margin-top: 20px;
        }

        .submit__button:hover {
          opacity: 0.8;
        }

        .existing__votes {
          background-color: #ffffe0;
          padding: 7.5px 10px;
          width: calc(100% - 22px);
          border-radius: 5px;
          text-align: center;
          border: 1px solid #fada5e;
        }
      `}</style>
    </div>
  )
}
