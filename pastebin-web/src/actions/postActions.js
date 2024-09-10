import axios from 'axios'

import { USER_POSTS_ENDPOINT } from '../helpers/endpoints'
import { setUserPosts } from '../reducers/userPostReducer'

export const getUserPosts = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios.get(USER_POSTS_ENDPOINT)
      .then(response => {
        dispatch(setUserPosts({ fetched: true, posts: response.data }))

        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}
