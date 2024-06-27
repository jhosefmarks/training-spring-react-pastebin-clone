import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    user: {}
  },
  reducers: {
    setCurrentUser: (state, action) => {
      const { payload } = action

      state.loggedIn = payload.loggedIn
      state.user = payload.user
    }
  }
})

export const { setCurrentUser } = authSlice.actions
export default authSlice.reducer
