import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'

import {
  BasePage,
  HomePage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
} from 'pages'
import { IngredientDetails, Modal, ProtectedRoute } from 'components'

import { getIngredients } from 'services/actions/ingredients'

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
      <Switch location={background || location}>
        <Route
          path='/'
          exact
        >
          <HomePage />
        </Route>
        <ProtectedRoute
          path='/profile'
          exact
        >
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
          <BasePage>
            <IngredientDetails />
          </BasePage>
        </Route>
      </Switch>

      {background && (
        <Route
          path='/ingredients/:id'
          exact
        >
          <Modal closeModal={closeModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  )
}

export default App
