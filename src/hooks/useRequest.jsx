import { useContext, useEffect, useState } from 'react'
import TokenContext from '../store/token-context'

const useRequest = ({ url, method, body }) => {
  const tokenContext = useContext(TokenContext)
  const [data, setData] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  let options = {
    method,
    headers: {
      'access-token': 'bearer ' + tokenContext.accessToken,
      'refresh-token': 'bearer ' + tokenContext.refreshToken,
    },
  }

  if (method !== 'GET') {
    options = {
      method,
      body: JSON.parse(body),
      headers: {
        'Content-Type': 'application/json',
        'access-token': 'bearer ' + tokenContext.accessToken,
        'refresh-token': 'bearer ' + tokenContext.refreshToken,
      },
    }
  }

  useEffect(() => {
    setIsLoading(true)
    fetch(url, options)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((res) => {
        console.log(res)
        setData(res.data)
        tokenContext.setAccessToken(res.tokens.newAccessToken)
      })
      .catch((err) => {
        console.log(err)
        setError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [url])

  return { fetchedData: data, isLoading, error }
}

export default useRequest
