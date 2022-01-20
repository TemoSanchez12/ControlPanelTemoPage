import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App'
import { TokenContextProvider } from './store/token-context'
import { NotificationContextProvider } from './store/notification-context'

ReactDOM.render(
  <BrowserRouter>
    <TokenContextProvider>
      <NotificationContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </NotificationContextProvider>
    </TokenContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
