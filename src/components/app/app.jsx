import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'

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

import { getIngredients } from 'services/actions/ingredients'

import appStyles from './app.module.scss'

const App = () => {
  const dispatch = useDispatch()

  const location = useLocation()
  const history = useHistory()
  const background = location.state?.background

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  const closeModal = useCallback(() => history.goBack(), [history])

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
            <Modal closeModal={closeModal}>
              <OrderInfo />
            </Modal>
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
        </Switch>
      )}
    </>
  )
}

export default App
