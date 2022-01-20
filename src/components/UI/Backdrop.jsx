const Backdrop = (props) => {
  return (
    <div
      onClick={props.onClose}
      className='bg-backdrop-black fixed w-full h-full z-10 top-0 left-0 flex justify-center items-center'
    >
      {props.children}
    </div>
  )
}

export default Backdrop
