import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from '../helpers/endpoints'
import setAuthToken from '../helpers/setAuthToken'
import { setCurrentUser } from '../reducers/authReducer'

export const loginUser = (userData) => dispatch => {
  return new Promise((resolve, reject) => {
    axios.post(LOGIN_ENDPOINT, userData, {
      headers: {'Accept': 'application/json', 'Content-type': 'application/json'}
    }).then(response => {
      const { authorization } = response.headers

      localStorage.setItem('jwtToken', authorization)

      setAuthToken(authorization)

      const decoded = jwtDecode(authorization)

      dispatch(setCurrentUser({ user: decoded, loggedIn: true }))

      resolve(response)
    }).catch(error => {
        reject(error)
    })
  })
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken')

  setAuthToken(false)

  dispatch(setCurrentUser({ user: {}, loggedIn: false }))
}

export const registerUser = (userData) => dispatch => {
  return new Promise((resolve, reject) => {
    axios.post(REGISTER_ENDPOINT, userData, {
      headers: {'Accept': 'application/json', 'Content-type': 'application/json'}
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
