import { useNavigate } from 'react-router-dom'

import { useContext } from 'react'
import TokenContext from '../../store/token-context'
import NotificationContext from '../../store/notification-context'
import CONSTANTS from '../../CONSTANTS.js'

const MainHeader = () => {
  const navigate = useNavigate()

  const notificationContext = useContext(NotificationContext)
  const tokenContext = useContext(TokenContext)

  const logoutHandler = () => {
    fetch(CONSTANTS.base_url + '/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': 'bearer ' + tokenContext.accessToken,
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((res) => {
        notificationContext.setNotificationData({
          status: 'success',
          title: 'Correct',
          content: 'User logout successfully',
        })
        tokenContext.deleteRefreshAndAccessToken()
      })
      .catch((err) => {
        console.log(err)
        notificationContext.setNotificationData({
          status: 'error',
          title: 'Error',
          content: 'Something went wrong trying to loguot',
        })
      })
  }

  const changeNavigateHandler = (route) => {
    navigate(route, { replace: true })
  }

  return (
    <header className='flex justify-between bg-white px-8 py-4 rounded-lg'>
      <div className='flex items-center'>
        <h2 className='mr-8 text-2xl font-semibold'>
          Welcome{' '}
          <span className='text-indigo-600 font-bold'>Temo Sanchez</span>
        </h2>

        <select
          onChange={(e) => changeNavigateHandler(e.target.value)}
          className='py-2 px-8 bg-white border-2 border-grey-300 rounded-lg text-lg'
        >
          <option value='/'>Dashboard</option>
          <option value='/works'>Works</option>
          <option value='/posts'>Post</option>
        </select>
      </div>

      <button
        onClick={logoutHandler}
        className='bg-red-500 hover:bg-red-700 transition duration-300 ease-in-out py-2 px-6 text-white font-semibold text-lg rounded-lg'
      >
        Logout
      </button>
    </header>
  )
}

export default MainHeader
