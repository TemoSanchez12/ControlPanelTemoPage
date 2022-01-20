import PostItem from './PostItem'

const PostList = ({ posts, onSetEditablePost, onDeletePost }) => {
  return (
    <ul>
      {posts.map((post) => (
        <PostItem
          post={post}
          key={post.id}
          onDeletePost={onDeletePost}
          onSetEditablePost={onSetEditablePost}
        />
      ))}
    </ul>
  )
}

export default PostList
