import React, { useState } from 'react'

const TokenContext = React.createContext({
  refreshToken: '',
  accessToken: '',
  setRefreshToken: () => {},
  setAccessToken: () => {},
  deleteRefreshAndAccessToken: () => {},
})

export const TokenContextProvider = (props) => {
  const [refreshToken, setRefreshToken] = useState('')
  const [accessToken, setAccessToken] = useState('')

  const deleteRefreshAndAccessToken = () => {
    setRefreshToken(null)
    setAccessToken(null)
  }

  const tokenContextProviderValue = {
    refreshToken,
    accessToken,
    setAccessToken,
    setRefreshToken,
    deleteRefreshAndAccessToken,
  }

  return (
    <TokenContext.Provider value={tokenContextProviderValue}>
      {props.children}
    </TokenContext.Provider>
  )
}

export default TokenContext
