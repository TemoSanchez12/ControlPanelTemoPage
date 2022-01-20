const WorkItemContent = ({ work, onSetEditableWork, onDeleteWork }) => {
  const editWorkHandler = () => {
    onSetEditableWork(work)
  }

  const deleteWorkHandler = () => {
    onDeleteWork(work.id)
  }

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const formatedDate = new Date(work.date).toLocaleDateString('en-US', options)

  return (
    <div className='p-8 text-lg w-3/5'>
      <div className='flex'>
        <label className='mr-4 font-bold'>Name: </label>
        <h3>{work.name}</h3>
      </div>

      <div className='flex mt-4'>
        <label className='mr-4 font-bold'>Link: </label>
        <p>{work.link}</p>
      </div>

      <div className='mt-4'>
        <label className='font-bold'>Techs: </label>
        <ul className='ml-8 list-disc'>
          {work.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>

      <div className='mt-4'>
        <label className='font-bold'>Description: </label>
        <p>{work.description}</p>
      </div>

      <div className='mt-4'>
        <label className='font-bold mr-4'>Date: </label>
        <time>{formatedDate}</time>
      </div>

      <div className='mt-6 flex justify-end'>
        <button
          onClick={editWorkHandler}
          className='py-2 px-8 bg-indigo-600 hover:bg-indigo-800 rounded-md mr-4 transition ease-out duration-700 text-white'
        >
          Edit
        </button>
        <button
          onClick={deleteWorkHandler}
          className='py-2 px-8 bg-red-600 hover:bg-red-800 rounded-md transition ease-out text-white duration-700'
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default WorkItemContent
