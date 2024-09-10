import { combineReducers } from 'redux'

import authReducer from './authReducer'
import userPostReducer from './userPostReducer'

export default combineReducers({
  auth: authReducer,
  userPosts: userPostReducer,
})
