const groupSide = 5
const groupSize = 5 ** 2

export const RemainingCredits = ({
  creditsPerVoter,
  creditsRemaining,
}: {
  creditsPerVoter: number
  creditsRemaining: number
}) => {
  let blocksShown = 0

  return (
    <div>
      <i className="opacity-75">
        Remaining Credits: <span className="inline-block w-7">{creditsRemaining}</span> / {creditsPerVoter}
      </i>
      <div className="flex items-center justify-center w-full ">
        {new Array(Math.ceil(creditsPerVoter / groupSize)).fill(0).map((_, g) => (
          <div
            key={g}
            className="flex flex-col-reverse space-y-reverse space-y-[2px] items-center justify-center w-9 h-10"
          >
            {new Array(groupSide).fill(0).map((_, x) => (
              <div key={x} className="flex space-x-[2px]">
                {new Array(groupSide).fill(0).map((_, y) => (
                  <div
                    key={y}
                    className={`w-1 h-1 bg-white/70 ${blocksShown++ < creditsRemaining ? '' : 'invisible'}`}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
