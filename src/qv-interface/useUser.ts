import { useEffect, useState } from 'react'

type Vote_Data = { title: string }[]
type All_Data = { loading: boolean; vote_data: Vote_Data; name: string }

export const useUser = (): All_Data => {
  const [data, setData] = useState<All_Data>({ vote_data: [], loading: false, name: 'TODO_FIX_NAME' })

  useEffect(() => {
    console.warn('FindUser replaced w/ placeholder loader')
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
