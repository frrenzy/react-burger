import { useEffect, FC, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import { Loading } from 'components'

import { getUser } from 'services/actions/auth'

interface IProtectedRoute extends RouteProps {
  children: ReactNode
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
  //@ts-ignore
  const { user, userFailed } = useSelector(store => store.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    //@ts-ignore
    dispatch(getUser())
  }, [dispatch])

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
