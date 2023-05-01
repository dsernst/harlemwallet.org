import { useEffect } from 'react'

export const useUrlAuth = (LogIn: (authCode: string) => Promise<true | void>, setAuthCode: (a: string) => void) => {
  const qrLogin = async () => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const authCode = urlSearchParams.get('auth')

    if (authCode) {
      setAuthCode(authCode)

      // LogIn() returns true if successful
      if (await LogIn(authCode)) {
        urlSearchParams.delete('auth')
        window.history.replaceState(null, '', `${window.location.pathname}?${urlSearchParams.toString()}`)
      }
    }
  }

  useEffect(() => {
    qrLogin()
  }, [])
}
