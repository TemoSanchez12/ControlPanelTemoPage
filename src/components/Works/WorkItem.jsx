import WorkItemContent from './WorkItemContent'

const WorkItem = ({ work, onSetEditableWork, onDeleteWork }) => {
  return (
    <li className='flex justify-between bg-white rounded-xl overflow-hidden mx-auto mb-8'>
      <WorkItemContent
        work={work}
        onSetEditableWork={onSetEditableWork}
        onDeleteWork={onDeleteWork}
      />
      <div className='w-2/5'>
        <img
          className='h-full object-cover'
          src={`https://res.cloudinary.com/batemo12/${work.image}`}
          alt={work.name}
        />
      </div>
    </li>
  )
}

export default WorkItem
