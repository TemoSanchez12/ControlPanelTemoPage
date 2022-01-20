import { useContext, useEffect, useState } from 'react'
import TokenContext from '../store/token-context'
import NotificationContext from '../store/notification-context'

import CreatePostForm from '../components/Posts/CreatePostForm'
import EditPostForm from '../components/Posts/EditPostForm'
import PostList from '../components/Posts/PostList'
import Spinner from '../components/UI/Spinner'
import Modal from '../components/UI/Modal'
import CONSTANTS from '../CONSTANTS.js'

const PostPanel = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [editablePost, setEditablePost] = useState(undefined)
  const [createPostMode, setCreatePostMode] = useState(false)

  const tokenContext = useContext(TokenContext)
  const notificationContext = useContext(NotificationContext)

  useEffect(() => {
    setIsLoading(true)
    fetch(CONSTANTS.base_url + '/api/post', {
      method: 'GET',
      headers: {
        'access-token': 'bearer ' + tokenContext.accessToken,
        'refresh-token': 'bearer ' + tokenContext.refreshToken,
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((res) => {
        setPosts(res.data.posts)
        tokenContext.setAccessToken(res.tokens.newAccessToken)
      })
      .catch((err) => {
        notificationContext.setNotificationData({
          status: 'error',
          title: 'Something went wrong',
          content: 'Can not fetch posts',
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const closeEditPostForm = () => {
    setEditablePost(null)
  }

  const onSaveEditPost = (updatedPost) => {
    const postsWithoutUpdatedPost = posts.filter((p) => p.id !== updatedPost.id)

    setPosts([...postsWithoutUpdatedPost, updatedPost])

    notificationContext.setNotificationData({
      status: 'success',
      title: 'Post updated',
      content: 'Post data updated successfully',
    })
  }

  const closeCreateFormMode = () => {
    setCreatePostMode(false)
  }

  const onSaveNewPost = (newPost) => {
    setPosts((prev) => [...prev, newPost])
    notificationContext.setNotificationData({
      status: 'success',
      title: 'Post created',
      content: 'Post created successfully',
    })
  }

  const onDeletePost = (postId) => {
    fetch(CONSTANTS.base_url + '/api/post', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'access-token': 'bearer ' + tokenContext.accessToken,
        'refresh-token': 'bearer ' + tokenContext.refreshToken,
      },
      body: JSON.stringify({ postId }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((res) => {
        notificationContext.setNotificationData({
          status: 'success',
          title: 'Correct',
          content: 'Post deleted successfully',
        })

        const filteredPost = posts.filter((post) => post.id !== postId)
        setPosts(filteredPost)
        tokenContext.setAccessToken(res.tokens.newAccessToken)
      })
      .catch((err) => {
        notificationContext.setNotificationData({
          status: 'error',
          title: 'Fail',
          content: 'Something went wrong trying to delele post',
        })
      })
  }

  return (
    <main className='mt-8'>
      {editablePost && (
        <Modal onClose={closeEditPostForm}>
          <EditPostForm
            post={editablePost}
            onClose={closeEditPostForm}
            onSaveEditPost={onSaveEditPost}
          />
        </Modal>
      )}

      {createPostMode && (
        <Modal onClose={closeCreateFormMode}>
          <CreatePostForm
            onClose={closeCreateFormMode}
            onSavenewPost={onSaveNewPost}
          />
        </Modal>
      )}

      <button
        onClick={() => setCreatePostMode(true)}
        className='py-2 px-4 rounded-md text-white bg-indigo-600 mb-4 hover:bg-indigo-700'
      >
        Create post
      </button>

      {isLoading ? (
        <Spinner />
      ) : (
        <PostList
          posts={posts}
          onSetEditablePost={setEditablePost}
          onDeletePost={onDeletePost}
        />
      )}
    </main>
  )
}

export default PostPanel
