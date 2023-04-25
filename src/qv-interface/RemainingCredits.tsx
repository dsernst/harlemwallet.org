export const RemainingCredits = ({
  creditBalance,
  creditsRemaining,
}: {
  creditBalance: number
  creditsRemaining: number
}) => (
  <div>
    <i>
      Remaining Credits: <span className="inline-block w-7">{creditsRemaining}</span> / {creditBalance}
    </i>
  </div>
)
