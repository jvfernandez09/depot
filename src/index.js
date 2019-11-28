import React from 'react'
import ReactDOM from 'react-dom'
import { concat } from 'apollo-link'
import { ApolloClient } from "apollo-client"
import { ApolloProvider } from "react-apollo"
import { InMemoryCache } from 'apollo-cache-inmemory'
import { RetryLink } from 'apollo-link-retry'
import { RestLink } from 'apollo-link-rest'
import { setContext } from 'apollo-link-context'

import Routes from './routes'
import './index.scss'

import * as serviceWorker from './serviceWorker'


import humps from 'humps'

const API = process.env.REACT_APP_ENV === 'staging' || process.env.REACT_APP_ENV === 'development' ? process.env.REACT_APP_GWX_STAGING_URL
: process.env.REACT_APP_GWX_PROD_URL

const TOKEN_DEPOT_API = process.env.REACT_APP_ENV === 'staging' || process.env.REACT_APP_ENV === 'development' ? process.env.REACT_APP_GWX_STAGING_API_URL
: process.env.REACT_APP_GWX_PROD_API_URL


const retry = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => !!error
  }
});

const restLink = new RestLink({
  uri: API,
  endpoints: {
    v1: API,
    v2: TOKEN_DEPOT_API,
    v3: process.env.REACT_APP_GWX_CRYPTO
  },
  headers: {
    "Content-Type": "application/json"
  },
  fieldNameDenormalizer: key => humps.decamelize(key)
})

const link = concat(retry, restLink)

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('AUTH_TOKEN')
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
