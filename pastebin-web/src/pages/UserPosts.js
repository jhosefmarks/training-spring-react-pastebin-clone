import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'
import { toast } from 'react-toastify'

import { getUserPosts } from '../actions/postActions'
import PostPlaceholder from '../components/utils/PostPlaceholder'
import NoPosts from '../components/utils/NoPosts'
import Post from '../components/post/Post'

export default function UserPosts() {
  const [fetching, setFetching] = useState(false)
  const posts = useSelector(state => state.userPosts.posts)
  // const fetched = useSelector(state => state.userPosts.fetched)
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchedPosts() {
      // if (!fetched) {
        try {
          setFetching(true)

          await dispatch(getUserPosts())

          setFetching(false)
        } catch(err) {
          toast.error(err.response.data.message, {
            position: 'bottom-center',
            theme: 'dark',
            autoClose: 2000
          })
        }
      // }
    }

    fetchedPosts()
  }, [dispatch/*, fetched*/])

  return (
    <div>
      <Alert variant="secondary" className="mt-5">
        <h1>Meus posts</h1>
      </Alert>
      { fetching && <PostPlaceholder /> }
      { !fetching && posts.length === 0 && <NoPosts text="Não existem post privados disponíveis"></NoPosts> }
      <div>
        { posts.map(post => <Post key={post.postId} post={post} renderControls={true} ></Post>) }
      </div>
    </div>
  )
}
