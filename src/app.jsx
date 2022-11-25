import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import {
  HomePage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
} from 'pages'

import { ProtectedRoute } from 'components'

const App = () => {
  return (
    <Router>
      <Switch>
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
      </Switch>
    </Router>
  )
}

export default App
