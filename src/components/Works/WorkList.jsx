import WorkItem from './WorkItem'

const WorkList = ({ works, onSetEditableWork, onDeleteWork }) => {
  if (!works) {
    return <p>Something went wrong</p>
  }

  return (
    <ul>
      {works.map((work) => (
        <WorkItem
          key={work.id}
          work={work}
          onSetEditableWork={onSetEditableWork}
          onDeleteWork={onDeleteWork}
        />
      ))}
    </ul>
  )
}

export default WorkList
