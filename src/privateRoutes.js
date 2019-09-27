import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { isLoggedIn } from './utils/helpers'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => {
      const { exact, path, ...extraProps } = rest
      return isLoggedIn() ? <Component {...props} {...extraProps} /> :
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />

    }} />
  )
}

export default PrivateRoute

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object
}
