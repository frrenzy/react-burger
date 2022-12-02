import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Link, NavLink, Route, Switch, useRouteMatch} from 'react-router-dom'

import { signOut } from 'services/actions/auth'

import profileStyles from './profile.module.scss'
import ProfileForm from 'components/profile-form/profile-form'
import { OrderList } from 'components'

const ProfilePage = () => {
  const dispatch = useDispatch()

  const { path } = useRouteMatch()

  const generateNavLinkClassname = useCallback(
    isActive =>
      `${profileStyles.tab} text text_type_main-medium ${
        !isActive && 'text_color_inactive'
      } pt-4 pb-4`,
    [],
  )

  const handleExit = useCallback(() => {
    dispatch(signOut())
  }, [dispatch])

  return (
    <div className={`${profileStyles.container} mt-30`}>
      <div>
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
          <OrderList />
        </Route>
      </Switch>
    </div>
  )
}

export default ProfilePage
