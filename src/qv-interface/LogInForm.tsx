import React, { useState } from 'react'
import { useUrlAuth } from './useUrlAuth'
import { Spinner } from '../Spinner'

export const LogInForm = () => {
  const [user, setUser] = useState<string | null>(null)
  const [hidForm, setHidForm] = useState(false)
  const [authCode, setAuthCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const LogIn = async (authCode: string) => {
    if (!authCode) return setError('Please enter an auth code')

    setLoading(true)
    const response = await fetch(`/api/login`, {
      body: JSON.stringify({ auth: authCode }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    setLoading(false)
    if (response.status === 401) return setError(`Auth code '${authCode}' not found`)
    if (response.status === 200) {
      setAuthCode('')
      setUser((await response.json()).name)
      return true
    }
  }

  useUrlAuth(LogIn, setAuthCode)

  return (
    <div className="flex">
      {/* LoginForm */}
      {!hidForm && !user ? (
        <form
          onSubmit={(e: React.FormEvent) => e.preventDefault()}
          className="inline-flex flex-col p-4 mx-auto mt-10 mb-4 rounded-lg shadow-lg bg-fuchsia-400/20"
        >
          <p className="mb-1 text-sm text-white/75">Enter the Code from your postal letter:</p>
          <div className="flex items-center">
            <input
              type="text"
              value={authCode}
              onChange={(e) => {
                setAuthCode(e.target.value)
                setError('')
              }}
              placeholder="Auth code"
              className="p-1 px-3 mr-2 text-lg border-2 rounded w-36 border-fuchsia-700/30 focus:outline-none focus:border-fuchsia-400"
            />
            <button
              type="submit"
              className="p-4 py-2 font-bold rounded-md cursor-pointer bg-black/60 text-fuchsia-100 hover:bg-black hover:text-fuchsia-300"
              onClick={() => LogIn(authCode)}
            >
              {loading && <Spinner />} Log In
            </button>
            <button
              type="button"
              className="px-3 py-2 ml-2 rounded hover:bg-white/10 bg-white/5 text-white/70"
              onClick={() => setHidForm(true)}
            >
              Hide
            </button>
          </div>
          {error && <p className="mt-1.5 font-bold text-red-300">Error: {error}</p>}
        </form>
      ) : (
        // Login Status in top-right corner
        <div className="w-full mt-5 text-sm text-center sm:w-auto sm:absolute sm:right-7 sm:top-1 text-white/90">
          {!user ? (
            <a className="px-3 py-2 rounded cursor-pointer hover:bg-white/20" onClick={() => setHidForm(false)}>
              Log In
            </a>
          ) : (
            <div className="flex flex-col sm:items-end">
              <span>
                <span className="inline sm:hidden">Logged in as: </span>
                {user}
              </span>
              <button className="block underline text-white/50 hover:text-white/70" onClick={() => setUser(null)}>
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
