import { useEffect } from 'react'

export const useUrlAuth = (LogIn: (authCode: string) => void) => {
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const authCode = urlSearchParams.get('auth')

    if (authCode) {
      console.log(`saw auth: ${authCode}`)
      LogIn(authCode)
    }
  }, [])
}
