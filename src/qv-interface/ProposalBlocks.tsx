export const ProposalBlocks = ({ cost }: { cost: number }) => (
  <div className={`mt-2 mb-3 ml-4 ${!cost && 'invisible'}`}>
    <i>Credits allocated: {cost}</i>
  </div>
)
