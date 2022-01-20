import ReactDom from 'react-dom'
import Backdrop from './Backdrop'

const Modal = (props) => {
  return (
    <>
      <div className='bg-white p-8 z-20 rounded-lg w-11/12 lg:w-240 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        {props.children}
      </div>
      <Backdrop onClose={props.onClose} />
    </>
  )
}

const ModalOverlay = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <Modal onClose={props.onClose}>{props.children}</Modal>,
        document.getElementById('overlay')
      )}
    </>
  )
}

export default ModalOverlay
