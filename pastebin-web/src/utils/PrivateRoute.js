import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute({ component: Component }) {
  const loggedIn = useSelector(state => state.auth.loggedIn)

  return loggedIn === true ? <Component /> : <Navigate to="/signin" />
}

