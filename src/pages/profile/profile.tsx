import { useCallback, useMemo, FC } from 'react'
import { useDispatch } from 'hooks'
import {
  Link,
  NavLink,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from 'react-router-dom'

import { OrderInfo, OrderList, ProfileForm } from 'components'

import { signOutThunk } from 'services/actions/auth'

import profileStyles from './profile.module.scss'

const ProfilePage: FC = () => {
  const dispatch = useDispatch()

  const { path } = useRouteMatch()
  const { pathname: location } = useLocation()

  const generateNavLinkClassname = useCallback<(isActive: boolean) => string>(
    isActive =>
      `${profileStyles.tab} text text_type_main-medium ${
        !isActive && 'text_color_inactive'
      } pt-4 pb-4`,
    [],
  )

  const handleExit = useCallback<() => void>(
    () => dispatch(signOutThunk()),
    [dispatch],
  )

  const containerClassName = useMemo<string>(
    () =>
      location === '/profile'
        ? `${profileStyles['container-form']} mt-30`
        : `${profileStyles['container-orders']} mt-10`,
    [location],
  )

  const tabsClassName = useMemo<string>(
    () => (location === '/profile' ? '' : 'mt-20'),
    [location],
  )

  return (
    <div className={containerClassName}>
      <div className={tabsClassName}>
        <NavLink
          className={generateNavLinkClassname}
          activeClassName={'text_color_primary'}
          to='/profile'
          exact
        >
          Профиль
        </NavLink>
        <NavLink
          className={generateNavLinkClassname}
          activeClassName={'text_color_primary'}
          to='/profile/orders'
          exact
        >
          История заказов
        </NavLink>
        <Link
          className={`${profileStyles.tab} text text_type_main-medium text_color_inactive pt-4 pb-4`}
          to='/login'
          onClick={handleExit}
        >
          Выход
        </Link>
        <p
          className={`${profileStyles.tab} text text_type_main-default text_color_inactive mt-20`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <Switch>
        <Route
          path={path}
          exact
        >
          <ProfileForm />
        </Route>
        <Route
          path={`${path}/orders`}
          exact
        >
          <OrderList full={true} />
        </Route>
        <Route
          path={`${path}/orders/:id`}
          exact
        >
          <OrderInfo />
        </Route>
      </Switch>
    </div>
  )
}

export default ProfilePage
