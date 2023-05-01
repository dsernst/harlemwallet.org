import { useEffect, useState } from 'react'

const getWindowDimensions = () => ({ height: window.innerHeight, width: window.innerWidth })

// Helper function to get window dimensions
export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({ height: 0, width: 0 })

  const handleResize = () => setWindowDimensions(getWindowDimensions())

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
