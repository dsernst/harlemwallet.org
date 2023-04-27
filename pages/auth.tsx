import React, { useState } from 'react'

type Mode = 'GUEST' | 'MANUAL' | 'QR'

interface User {
  firstName: string
  lastName: string
}

const AuthenticationInterface: React.FC = () => {
  const [mode, setMode] = useState<Mode>('MANUAL')
  const [user, setUser] = useState<User | null>(null)

  const handleManualLogin = (authCode: string) => {
    // Implement login logic here
  }

  const handleSkip = () => {
    setMode('GUEST')
  }

  return (
    <div className="flex flex-col items-center">
      <header className="mb-4 text-xl">
        {mode === 'MANUAL' && <ManualLoginForm onLogin={handleManualLogin} onSkip={handleSkip} />}
        {user && (
          <span>
            Logged In: {user.firstName} {user.lastName}{' '}
            <button className="text-blue-600 underline" onClick={() => setUser(null)}>
              Log Out
            </button>
          </span>
        )}
      </header>
      {/* Add the rest of the app components here */}
    </div>
  )
}

interface ManualLoginFormProps {
  onLogin: (authCode: string) => void
  onSkip: () => void
}

const ManualLoginForm: React.FC<ManualLoginFormProps> = ({ onLogin, onSkip }) => {
  const [authCode, setAuthCode] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(authCode)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={authCode}
        onChange={(e) => setAuthCode(e.target.value)}
        placeholder="Auth code"
        className="p-1 mr-2 border-2 border-gray-300"
      />
      <button
        type="submit"
        className="p-4 py-2 mt-1 text-base font-bold bg-black rounded-md cursor-pointer text-fuchsia-100 hover:opacity-70"
      >
        Log In
      </button>
      <button type="button" className="p-4 py-2 mt-1 text-base text-gray-500" onClick={onSkip}>
        Skip
      </button>
    </form>
  )
}

export default AuthenticationInterface
