import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { HomePage, LoginPage } from 'pages'
import RegistrationPage from 'pages/registration/registration'

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
      </Switch>
    </Router>
  )
}

export default App
