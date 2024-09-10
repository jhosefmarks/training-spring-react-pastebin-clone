import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'

import {  PUBLIC_POSTS_ENDPOINT } from '../helpers/endpoints'
import PostPlaceholder from '../components/utils/PostPlaceholder'
import NoPosts from '../components/utils/NoPosts'
import Post from '../components/post/Post'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    axios.get(PUBLIC_POSTS_ENDPOINT).then(response => {
      setPosts(response.data)
      setFetching(false)
    }).catch(e => {
      setFetching(false)
    })
  }, [])

  return (
    <div>
      <Alert variant="secondary" className="mt-5">
        <h1>Últimos posts públicos</h1>
      </Alert>

      { fetching && <PostPlaceholder /> }
      { !fetching && posts.length === 0 && <NoPosts text="Não existem post públicos disponíveis"></NoPosts> }
      <div>
        { posts.map(post => <Post key={post.postId} post={post} renderControls={false}></Post>) }
      </div>
    </div>
  )
}
