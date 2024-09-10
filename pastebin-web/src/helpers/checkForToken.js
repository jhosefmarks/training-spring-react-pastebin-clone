import { jwtDecode } from 'jwt-decode'

import { logoutUser } from '../actions/authActions'
import { setCurrentUser } from '../reducers/authReducer'
import store from '../store'
import setAuthToken from './setAuthToken'

const checkForToken = () => {
  if (localStorage.jwtToken) {
    const decoded = jwtDecode(localStorage.jwtToken)

    const currentTime = Math.floor(Date.now() / 1000)

    if (decoded.exp >= currentTime) {
      setAuthToken(localStorage.jwtToken)

      store.dispatch(setCurrentUser({ user: decoded, loggedIn: true }))
    } else {
      store.dispatch(logoutUser())
      window.location.href = '/signin'
    }
  }
}

export default checkForToken
