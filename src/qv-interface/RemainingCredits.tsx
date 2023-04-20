export const RemainingCredits = ({
  creditBalance,
  creditsRemaining,
}: {
  creditBalance: number
  creditsRemaining: number
}) => (
  <div>
    <i>
      RemainingCredits: {creditsRemaining} / {creditBalance}
    </i>
  </div>
)
