import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { ApolloClient } from "apollo-client"
import { ApolloProvider } from "react-apollo"
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest'

import './index.css'
import App from './App'
import Login from 'login'
import * as serviceWorker from './serviceWorker'


const restLink = new RestLink({
  uri: "http://registry-staging.gameworks.io"
})

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </ApolloProvider>
, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
