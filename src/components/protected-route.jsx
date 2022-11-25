import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { getUser } from 'services/actions/auth'
import { Loading } from 'components'

const ProtectedRoute = ({ children, ...rest }) => {
  const { user, userRequest, userFailed } = useSelector(store => store.auth)
  const dispatch = useDispatch()

  // const [userLoading, setUserLoading] = useState(true)

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
