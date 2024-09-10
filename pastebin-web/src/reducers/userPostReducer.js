import { createSlice } from '@reduxjs/toolkit'

export const userPostsSlice = createSlice({
  name: 'userPosts',
  initialState: { posts: [], fetched: false },
  reducers: {
    setUserPosts: (state, action) => {
      const { payload } = action

      state.fetched = payload.fetched
      state.posts = [...payload.posts]
    }
  }
})

export const { setUserPosts } = userPostsSlice.actions
export default userPostsSlice.reducer
