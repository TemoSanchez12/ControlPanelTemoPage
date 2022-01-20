import { useRef, useContext, useState } from 'react'
import TokenContext from '../../store/token-context'
import NotificationContext from '../../store/notification-context'
import CONSTANTS from '../../CONSTANTS.js'

const CreatePostForm = ({ onClose, onSaveNewPost }) => {
  const tokenContext = useContext(TokenContext)
  const notificationContext = useContext(NotificationContext)

  const plataformInputRef = useRef()
  const linkInputRef = useRef()
  const dateInputRef = useRef()
  const readingTimeInputRef = useRef()

  const [uploadedImage, setUploadedImage] = useState('')

  const fileInputChangeHandler = (e) => {
    const image = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(image)

    reader.onloadend = () => {
      setUploadedImage(reader.result)
    }
  }

  const submitCreatePostHandler = async (e) => {
    e.preventDefault()

    const data = {
      plataform: plataformInputRef.current.value,
      link: linkInputRef.current.value,
      image: uploadedImage,
      readingTime: readingTimeInputRef.current.value,
      date: dateInputRef.current.value,
    }

    try {
      const response = await fetch(CONSTANTS.base_url + '/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': 'bearer ' + tokenContext.accessToken,
          'refresh-token': 'bearer ' + tokenContext.refreshToken,
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())

      tokenContext.setAccessToken(response.tokens.newAccessToken)

      notificationContext.setNotificationData({
        status: 'success',
        title: 'Post created',
        content: 'Post created successfully',
      })

      onSaveNewPost({
        id: response.data.post._id.toString(),
        plataform: response.data.post.plataform,
        date: response.data.post.date,
        image: response.data.post.image,
        link: response.data.post.link,
        readingtime: response.data.post.readingTime,
      })

      onClose()
    } catch (err) {
      console.log(err)
      notificationContext.setNotificationData({
        status: 'error',
        title: 'Error',
        content: 'Something went wrong trying to create post',
      })
    }
  }

  return (
    <div className='w-4/5 mx-auto'>
      <h3 className='text-2xl font-semibold mb-8'>
        Edit <span className='text-indigo-500'>post</span>
      </h3>

      <form onSubmit={submitCreatePostHandler}>
        <div>
          <div className='mb-4 flex flex-col'>
            <label className='mr-4 font-bold text-xl' htmlFor='plataform'>
              Plataform
            </label>
            <select
              id='link'
              ref={plataformInputRef}
              className='px-4 py-2 bg-white rounded-md border-2 border-indigo-500'
            >
              <option value='instagram'>Instagram</option>
              <option value='youtube'>Youtube</option>
              <option value='linkedin'>Linkedin</option>
              <option value='devto'>DevTo</option>
            </select>
          </div>

          <div className='mb-4 flex flex-col'>
            <label htmlFor='link' className='mr-4 font-bold text-xl'>
              Link
            </label>
            <input
              type='text'
              id='link'
              ref={linkInputRef}
              className='border-2 border-solid border-indigo-600 py-2 px-4 mt-2 rounded-md'
            />
          </div>

          <div className='mb-4 flex flex-col'>
            <label htmlFor='readingTime' className='mr-4 font-bold text-xl'>
              Reading time
            </label>
            <input
              ref={readingTimeInputRef}
              type='number'
              id='readingTime'
              className='border-2 border-solid border-indigo-600 py-2 px-4 mt-2 rounded-md w-2/5'
            />
          </div>

          <div className='flex flex-col mb-4 '>
            <label htmlFor='image' className='mr-4 font-bold text-xl'>
              Image:
            </label>
            <input
              type='file'
              id='image'
              onChange={fileInputChangeHandler}
              className='border-2 border-solid border-indigo-600 py-2 px-4 mt-2 rounded-md w-96'
            />
          </div>

          <div className=' flex justify-between w-full'>
            {uploadedImage && (
              <div className='w-1/2 ml-4'>
                <p className='mr-4 font-bold text-xl'>New image: </p>
                <img src={uploadedImage} alt='Prev new image' />
              </div>
            )}
          </div>

          <div className='mb-4 flex flex-col'>
            <label htmlFor='date' className='mr-4 font-bold text-xl'>
              Date
            </label>
            <input
              type='date'
              id='date'
              ref={dateInputRef}
              className='border-2 border-solid border-indigo-600 py-2 px-4 mt-2 rounded-md w-2/5'
            />
          </div>
        </div>
        <div className='mt-6 flex justify-end'>
          <button
            type='submit'
            className='py-2 px-8 bg-indigo-600 hover:bg-indigo-800 rounded-md mr-4 transition ease-out duration-700 text-white'
          >
            Save
          </button>
          <button
            onClick={onClose}
            className='py-2 px-8 bg-red-600 hover:bg-red-800 rounded-md transition ease-out text-white duration-700'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePostForm
