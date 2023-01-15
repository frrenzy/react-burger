import { useEffect, FC, ReactNode } from 'react'
import { useDispatch, useSelector } from 'hooks'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import { Loading } from 'components'

import { getUserThunk } from 'services/actions/auth'
import { IAuthState } from 'services/reducers/auth'

interface IProtectedRoute extends RouteProps {
  children: ReactNode
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
  const { user, userFailed }: IAuthState = useSelector(store => store.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserThunk())
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
