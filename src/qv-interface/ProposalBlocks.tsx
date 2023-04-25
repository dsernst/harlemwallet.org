import React from 'react'

export const ProposalBlocks = ({ votes }: { votes: number }) => (
  <div className={`${!votes && 'invisible'} flex items-center justify-center space-x-3 my-2`}>
    <i className="pr-1.5 text-right opacity-70">
      Credits
      <br className="block sm:hidden" /> allocated:
    </i>
    <i>{votes ** 2}</i>

    <div className="space-y-[2px] h-16 w-16 flex flex-col justify-center items-center">
      {new Array(votes).fill(0).map((_, x) => (
        <div key={x} className="flex space-x-[2px]">
          {new Array(votes).fill(0).map((_, y) => (
            <div key={y} className="w-1 h-1 bg-white/70" />
          ))}
        </div>
      ))}
    </div>
  </div>
)
