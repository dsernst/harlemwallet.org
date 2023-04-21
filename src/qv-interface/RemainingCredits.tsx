export const RemainingCredits = ({
  creditBalance,
  creditsRemaining,
}: {
  creditBalance: number
  creditsRemaining: number
}) => (
  <div>
    <i>
      Remaining Credits: {creditsRemaining} / {creditBalance}
    </i>
  </div>
)
