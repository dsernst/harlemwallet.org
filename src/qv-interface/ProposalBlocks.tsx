export const ProposalBlocks = ({ cost }: { cost: number }) => (
  <div className={`mt-2 mb-3 ml-4 ${!cost && 'invisible'}`}>
    <i>Proposal blocks: {cost}</i>
  </div>
)
