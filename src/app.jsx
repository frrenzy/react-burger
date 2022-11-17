import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { HomePage, LoginPage } from 'pages'

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
      </Switch>
    </Router>
  )
}

export default App
