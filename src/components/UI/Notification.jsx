import ReactDom from 'react-dom'

const Notification = ({ notificationData }) => {
  const { title, content, status } = notificationData
  const styles = {
    success: 'border-teal-600 bg-teal-200  text-teal-600',
    error: 'border-red-600 bg-red-200 text-red-600',
    neutral: 'border-indigo-600 bg-indigo-200 text-indigo-600',
  }

  return (
    <div
      className={`fixed top-10 right-10 border-2 border-solid h-36 w-96 text-center z-30  flex flex-col justify-center items-center rounded-2xl ${styles[status]}`}
    >
      <h3 className='font-bold text-xl mb-8'>{title}</h3>
      <p className='font-semibold'>{content}</p>
    </div>
  )
}

const NotificationOverlay = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <Notification notificationData={props.notificationData} />,
        document.getElementById('overlay')
      )}
    </>
  )
}

export default NotificationOverlay
