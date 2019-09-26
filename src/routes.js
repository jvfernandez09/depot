import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './privateRoutes'
import App from './App'
import Login from 'login'
import Register from 'register'
import ErrorContainer from './error'
import ForgotPassword from 'forgotPassword'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/reset" component={ForgotPassword} />
        <Route path="/error" component={ErrorContainer} />
        <PrivateRoute exac path="/" component={App} />
      </Switch>
    </Router>
  )
}

export default Routes
