const PostItem = ({ post, onSetEditablePost, onDeletePost }) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const formatedDate = new Date(post.date).toLocaleDateString('en-US', options)

  return (
    <div className='text-lg w-full flex bg-white mb-8 rounded-lg'>
      <div className='w-3/5 p-8'>
        <div className='flex mb-4'>
          <label className='mr-4 font-bold'>Plataform: </label>
          <p>{post.plataform}</p>
        </div>

        <div className='flex mb-4'>
          <label className='mr-4 font-bold'>Reading time: </label>
          <p>{post.readingTime}</p>
        </div>

        <div className='flex mb-4'>
          <label className='mr-4 font-bold'>Link: </label>
          <p>{post.link}</p>
        </div>

        <div className='flex mb-4'>
          <label className='mr-4 font-bold'>Date: </label>
          <time>{formatedDate}</time>
        </div>

        <div className='mt-6 flex justify-end'>
          <button
            onClick={() => {
              onSetEditablePost(post)
            }}
            className='py-2 px-8 bg-indigo-600 hover:bg-indigo-800 rounded-md mr-4 transition ease-out duration-700 text-white'
          >
            Edit
          </button>
          <button
            onClick={() => onDeletePost(post.id)}
            className='py-2 px-8 bg-red-600 hover:bg-red-800 rounded-md transition ease-out text-white duration-700'
          >
            Delete
          </button>
        </div>
      </div>
      <div className='w-2/5'>
        <img
          className='h-full object-cover'
          src={`https://res.cloudinary.com/dty1jkamt/${post.image}`}
          alt={post.plataform}
        />
      </div>
    </div>
  )
}

export default PostItem
