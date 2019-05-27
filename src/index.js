import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './privateRoutes'

import ReactDOM from 'react-dom';

import { ApolloClient } from "apollo-client"
import { ApolloProvider } from "react-apollo"
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link'

import './index.css'
import App from './App'
import Login from 'login'
import * as serviceWorker from './serviceWorker'

const restLink = new RestLink({
  uri: "http://registry-staging.gameworks.io",
  headers: {
    "Content-Type": "application/json"
  }
})

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('AUTH_TOKEN')
  return {
    headers: {
      ...headers,
      AuthorizationJWT: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(restLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute exac path="/" component={App} />
      </Switch>
    </Router>
  </ApolloProvider>
, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
