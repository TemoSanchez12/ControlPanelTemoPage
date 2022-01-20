import { useContext } from 'react'

import LoginForm from './components/LoginForm'
import MainPanel from './components/MainPanel'
import Notification from './components/UI/Notification'

import TokenContext from './store/token-context'
import NotificationContext from './store/notification-context'

function App() {
  const tokenContext = useContext(TokenContext)
  const notificationContext = useContext(NotificationContext)

  return (
    <>
      {notificationContext.notificationData && (
        <Notification notificationData={notificationContext.notificationData} />
      )}
      {tokenContext.accessToken && tokenContext.refreshToken ? (
        <MainPanel />
      ) : (
        <LoginForm />
      )}
    </>
  )
}

export default App
