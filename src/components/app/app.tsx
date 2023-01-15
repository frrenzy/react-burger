import { FC, useCallback, useEffect } from 'react'
import { useDispatch } from 'hooks'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import { Location } from 'history'

import {
  HomePage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  FeedPage,
} from 'pages'
import {
  AppHeader,
  IngredientDetails,
  Modal,
  NotFound404,
  OrderInfo,
  ProtectedRoute,
} from 'components'
import type { TCloseModalCallback } from 'components'

import { getIngredientsThunk } from 'services/actions/ingredients'

import appStyles from './app.module.scss'

interface ILocationWithState extends Location {
  state: { background?: Location }
}

const App: FC = () => {
  const dispatch = useDispatch()

  const location: ILocationWithState = useLocation()
  const history = useHistory()
  const background: Location | undefined = location.state?.background

  useEffect(() => {
    dispatch(getIngredientsThunk())
  }, [dispatch])

  const closeModal = useCallback<TCloseModalCallback>(
    () => history.goBack(),
    [history],
  )

  return (
    <>
      <AppHeader />
      <main className={appStyles.main}>
        <Switch location={background || location}>
          <Route
            path='/'
            exact
          >
            <HomePage />
          </Route>
          <Route
            path='/feed'
            exact
          >
            <FeedPage />
          </Route>
          <ProtectedRoute path='/profile'>
            <ProfilePage />
          </ProtectedRoute>
          <Route
            path='/login'
            exact
          >
            <LoginPage />
          </Route>
          <Route
            path='/register'
            exact
          >
            <RegistrationPage />
          </Route>
          <Route
            path='/forgot-password'
            exact
          >
            <ForgotPasswordPage />
          </Route>
          <Route
            path='/reset-password'
            exact
          >
            <ResetPasswordPage />
          </Route>
          <Route
            path='/ingredients/:id'
            exact
          >
            <IngredientDetails />
          </Route>
          <Route
            path='/feed/:id'
            exact
          >
            <OrderInfo />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      </main>

      {background && (
        <Switch>
          <Route
            path='/ingredients/:id'
            exact
          >
            <Modal closeModal={closeModal}>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route
            path='/feed/:id'
            exact
          >
            <Modal closeModal={closeModal}>
              <OrderInfo />
            </Modal>
          </Route>
          <ProtectedRoute
            path='/profile/orders/:id'
            exact
          >
            <Modal closeModal={closeModal}>
              <OrderInfo />
            </Modal>
          </ProtectedRoute>
        </Switch>
      )}
    </>
  )
}

export default App
