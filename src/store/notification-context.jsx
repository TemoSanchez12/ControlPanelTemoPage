import React, { useState } from 'react'

const NotificationContext = React.createContext({
  notificationData: {
    status: '',
    title: '',
    content: '',
  },
  setNotificationData: () => {},
})

export default NotificationContext

export const NotificationContextProvider = (props) => {
  const [notificationData, setNotificationData] = useState({})

  const setNotificationHandler = (notificationData) => {
    setNotificationData(notificationData)

    setTimeout(() => {
      setNotificationData(null)
    }, 5000)
  }

  const notificationContextProviderValue = {
    notificationData,
    setNotificationData: setNotificationHandler,
  }

  return (
    <NotificationContext.Provider value={notificationContextProviderValue}>
      {props.children}
    </NotificationContext.Provider>
  )
}
