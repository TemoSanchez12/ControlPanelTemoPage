import { useRef, useState, useContext } from 'react'
import NotificationContext from '../../store/notification-context'
import TokenContext from '../../store/token-context'
import CONSTANTS from '../../CONSTANTS.js'

const techTest = [
  'React.js',
  'Node.js',
  'Express.js',
  'Next.js',
  'TailwindCSS',
  'MongoDB',
  'MySQL',
  'Redux',
  'Router',
]

const CreateWorkForm = ({ onClose, onSaveNewWork }) => {
  const notificationContext = useContext(NotificationContext)
  const tokenContext = useContext(TokenContext)

  const nameInputRef = useRef()
  const linkInputRef = useRef()
  const descriptionInputRef = useRef()
  const dateInputRef = useRef()
  const [techsSelected, setTechSelected] = useState([])
  const [uploadedImage, setUploadedImgae] = useState('')

  const toggleTechSelectionHandler = (event) => {
    const toggledTech = event.target.nextSibling.htmlFor
    if (techsSelected.includes(toggledTech)) {
      const updatedTechList = techsSelected.filter(
        (tech) => tech !== toggledTech
      )
      setTechSelected(updatedTechList)
    } else {
      setTechSelected((prev) => [...prev, toggledTech])
    }
  }

  const fileInputChangeHandler = (e) => {
    const image = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(image)

    reader.onloadend = () => {
      setUploadedImgae(reader.result)
    }
  }

  const submitSaveWorkHandler = async (event) => {
    event.preventDefault()

    const data = {
      name: nameInputRef.current.value,
      link: linkInputRef.current.value,
      description: descriptionInputRef.current.value,
      date: dateInputRef.current.value,
      tech: techsSelected,
      image: uploadedImage,
    }

    try {
      notificationContext.setNotificationData({
        status: 'neutral',
        title: 'Sending request',
        content: 'Sending work data',
      })

      const response = await fetch(CONSTANTS.base_url + '/api/work', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': 'bearer ' + tokenContext.accessToken,
          'refresh-token': 'bearer ' + tokenContext.refreshToken,
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())

      tokenContext.setAccessToken(response.tokens.newAccessToken)

      onSaveNewWork({
        id: response.data.work._id.toString(),
        name: response.data.work.name,
        description: response.data.work.description,
        image: response.data.work.image,
        date: response.data.work.date,
        tech: response.data.work.tech,
        link: response.data.work.link,
      })
      onClose()
    } catch (err) {
      console.log(err)
      notificationContext.setNotificationData({
        status: 'error',
        title: 'Something went wrong',
        content: 'Something went wrong trying to save work',
      })
    }
  }

  return (
    <div className='w-4/5 mx-auto '>
      <h3 className='text-2xl font-semibold mb-8'>
        Edit <span className='text-indigo-500'>Work</span>
      </h3>

      <form onSubmit={submitSaveWorkHandler}>
        <div className='overflow-scroll overflow-x-hidden h-160'>
          <div className='flex flex-col mb-4 '>
            <label htmlFor='name' className='mr-4 font-bold text-xl'>
              Name:
            </label>
            <input
              type='text'
              id='name'
              ref={nameInputRef}
              className='border-2 border-solid border-indigo-600 py-2 px-4 mt-2 rounded-md'
            />
          </div>

          <div className='flex flex-col mb-4 '>
            <label htmlFor='name' className='mr-4 font-bold text-xl'>
              Link:
            </label>
            <input
              type='text'
              id='name'
              ref={linkInputRef}
              className='border-2 border-solid border-indigo-600 py-2 px-4 mt-2 rounded-md'
            />
          </div>

          <div className='flex flex-col mb-4 '>
            <label htmlFor='link' className='mr-4 font-bold text-xl'>
              Techs:
            </label>
            <div className='flex flex-wrap'>
              {techTest.map((tech) => (
                <div className='mr-8' key={tech}>
                  <input
                    type='checkbox'
                    id={tech}
                    onChange={toggleTechSelectionHandler}
                  />
                  <label htmlFor={tech} className='ml-2'>
                    {tech}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col mb-4 '>
            <label htmlFor='description' className='mr-4 font-bold text-xl'>
              Description:
            </label>
            <textarea
              id='description'
              ref={descriptionInputRef}
              className='border-2 border-solid border-indigo-600 py-2 px-4 mt-2 rounded-md'
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

          {uploadedImage && (
            <div className='w-1/2 ml-4'>
              <p className='mr-4 font-bold text-xl'>New image: </p>
              <img src={uploadedImage} alt='Prev new image' />
            </div>
          )}

          <div className='flex flex-col mb-4 '>
            <label htmlFor='date' className='mr-4 font-bold text-xl'>
              Date:
            </label>
            <input
              type='date'
              ref={dateInputRef}
              id='date'
              className='border-2 border-solid border-indigo-600 py-2 px-4 mt-2 rounded-md w-96'
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

export default CreateWorkForm
