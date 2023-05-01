import { useEffect } from 'react'

export const useUrlAuth = (LogIn: (authCode: string) => void, setAuthCode: (a: string) => void) => {
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const authCode = urlSearchParams.get('auth')

    if (authCode) {
      setAuthCode(authCode)
      LogIn(authCode)
    }
  }, [])
}
