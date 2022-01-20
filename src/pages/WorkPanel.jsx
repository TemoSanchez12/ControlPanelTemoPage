import { useState, useEffect, useContext } from 'react'

import TokenContext from '../store/token-context'
import NotificationContext from '../store/notification-context'

import WorkList from '../components/Works/WorkList'
import Spinner from '../components/UI/Spinner'
import Modal from '../components/UI/Modal'
import CreateWorkForm from '../components/Works/CreateWorkForm'
import EditWorkForm from '../components/Works/EditWorkForm'
import CONSTANTS from '../CONSTANTS.js'

const WorkPanel = () => {
  const tokenContext = useContext(TokenContext)
  const notificationContext = useContext(NotificationContext)

  const [works, setWorks] = useState([])
  const [editableWork, setEditableWork] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [createWork, setCreateWork] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch(CONSTANTS.base_url + '/api/work', {
      method: 'GET',
      headers: {
        'access-token': 'bearer ' + tokenContext.accessToken,
        'refresh-token': 'bearer ' + tokenContext.refreshToken,
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((res) => {
        tokenContext.setAccessToken(res.tokens.newAccessToken)
        setWorks(res.data.works)
      })
      .catch((err) => {
        notificationContext.setNotificationData({
          status: 'error',
          title: 'Something went wrong',
          content: 'Can not fetch works',
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const deleteWorkHandler = (workId) => {
    fetch(CONSTANTS.base_url + '/api/work', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'access-token': 'bearer ' + tokenContext.accessToken,
        'refresh-token': 'bearer ' + tokenContext.refreshToken,
      },
      body: JSON.stringify({ workId }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((res) => {
        notificationContext.setNotificationData({
          status: 'success',
          title: 'Correct',
          content: 'Work deleted successfully',
        })
        const filteredWorks = works.filter((work) => work.id !== workId)
        setWorks(filteredWorks)
        tokenContext.setAccessToken(res.tokens.newAccessToken)
      })
      .catch((err) => {
        console.log(err)
        notificationContext.setNotificationData({
          status: 'error',
          title: 'Fail',
          content: 'Something went wrong trying to delele work',
        })
      })
  }

  const closeEditingModeHandler = () => {
    setEditableWork(null)
  }

  const closeCreateWork = () => {
    setCreateWork(false)
  }

  const onSaveEdit = (updatedWork) => {
    const worksWithouUpdatedWork = works.filter((w) => w.id != updatedWork.id)

    setWorks([...worksWithouUpdatedWork, updatedWork])

    notificationContext.setNotificationData({
      status: 'success',
      title: 'Work updated',
      content: 'Work data updated correctly',
    })
  }

  const onSaveNewWork = (newWork) => {
    setWorks((prev) => [...prev, newWork])
    notificationContext.setNotificationData({
      status: 'success',
      title: 'Work created',
      content: 'Work created correctly',
    })
  }

  return (
    <main className='mt-8'>
      {editableWork && (
        <Modal onClose={closeEditingModeHandler}>
          <EditWorkForm
            work={editableWork}
            onClose={closeEditingModeHandler}
            onSaveEdit={onSaveEdit}
          />
        </Modal>
      )}
      {createWork && (
        <Modal onClose={closeCreateWork}>
          <CreateWorkForm
            onClose={closeCreateWork}
            onSaveNewWork={onSaveNewWork}
          />
        </Modal>
      )}
      <button
        onClick={() => setCreateWork(true)}
        className='py-2 px-4 rounded-md text-white bg-indigo-600 mb-4 hover:bg-indigo-700'
      >
        Create work
      </button>

      {isLoading ? (
        <Spinner />
      ) : (
        <WorkList
          works={works}
          onSetEditableWork={setEditableWork}
          onDeleteWork={deleteWorkHandler}
        />
      )}
    </main>
  )
}

export default WorkPanel
