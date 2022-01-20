import CONSTANTS from '../CONSTANTS.js'
import { useRef, useContext } from 'react'
import TokenContext from '../store/token-context'
import NotificationContext from '../store/notification-context'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const navigate = useNavigate()

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const tokenContext = useContext(TokenContext)
  const notificationContext = useContext(NotificationContext)

  const loginSubmitHandler = (e) => {
    e.preventDefault()
    const emailEntered = emailInputRef.current.value
    const passwordEntered = passwordInputRef.current.value

    fetch(CONSTANTS.base_url + '/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailEntered,
        password: passwordEntered,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((res) => {
        tokenContext.setRefreshToken(res.tokens.refreshToken)
        tokenContext.setAccessToken(res.tokens.accessToken)
        notificationContext.setNotificationData({
          status: 'success',
          title: 'Correct',
          content: 'User login successfully',
        })
        navigate('/', { replace: true })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='bg-white rounded-lg w-1/2 mx-auto mt-48 p-8'>
      <h3 className='text-2xl font-semibold mb-8'>Login</h3>
      <form onSubmit={loginSubmitHandler}>
        <div className='flex flex-col mb-4 '>
          <label htmlFor='email' className='mr-4 font-bold text-xl'>
            Email
          </label>
          <input
            type='email'
            ref={emailInputRef}
            className='border-2 border-solid border-indigo-600 py-2 px-4 mt-2 rounded-md'
          />
        </div>
        <div className='flex flex-col mb-4 '>
          <label htmlFor='password' className='mr-4 font-bold text-xl'>
            Passwork
          </label>
          <input
            type='password'
            ref={passwordInputRef}
            className='border-2 border-solid border-indigo-600 py-2 px-4 mt-2 rounded-md'
          />
        </div>

        <button
          type='submit'
          className='px-4 py-2 font-semibold  rounded-md text-white bg-indigo-600'
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
