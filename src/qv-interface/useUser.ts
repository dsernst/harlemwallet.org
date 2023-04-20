import { useEffect, useState } from 'react'

type Vote_Data = { title: string }[]

export const useUser = ({ setLoading }: { setLoading: (l: boolean) => void }): { vote_data: Vote_Data } => {
  const [data, setData] = useState<{ vote_data: Vote_Data }>({ vote_data: [] })

  useEffect(() => {
    console.warn('FindUser replaced w/ placeholder loader')
    setLoading(false)
    return

    // // Collect voter information on load
    // axios
    //   .get(`/api/events/find?id=${query.user}`)
    //   // If voter exists
    //   .then((response) => {
    //     // Set response data
    //     setData(response.data)
    //     // Set name if exists
    //     setName(
    //       response.data.voter_name !== null ? response.data.voter_name : ''
    //     )
    //     // Calculate QV votes with data
    //     calculateVotes(response.data)
    //     // Toggle global loading state to false
    //     setLoading(false)
    //   })
    //   // If voter does not exist
    //   .catch(() => {
    //     // Redirect to /place with error state default
    //     router.push('/place?error=true')
    //   })
  }, [])

  return data
}
