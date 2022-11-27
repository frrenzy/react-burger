import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

import { Loading } from 'components'

import { getUser } from 'services/actions/auth'

const ProtectedRoute = ({ children, ...rest }) => {
  const { user, userFailed } = useSelector(store => store.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [])

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !userFailed && !user ? (
          <Loading />
        ) : userFailed ? (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }}
    />
  )
}

export default ProtectedRoute
