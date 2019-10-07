import React, { useState } from "react"
import { compose, graphql, withApollo } from 'react-apollo'

import useForm from "utils/useForm"
import validateLogin from 'utils/LoginFormValidationRules'

import { isNull } from 'lodash'
import LOGIN_USER from 'lib/api/login'
import AUTHENTICATE from 'lib/api/auth'
import LoginForm from 'login/loginForm'
import Notification from 'utils/notification'

const Login = (props) => {
  const {
    inputs,
    errors,
    handleChange,
    handleSubmit
  } = useForm(login, validateLogin)

  const [isLoading, setLoading] = useState(false)

  async function login(){
    setLoading(true)
    const { loginUser, authenticateClientCred } = props
    const variables = { input: inputs }
    const clientCred = {
      input: {
        clientId: process.env.REACT_APP_GWX_CLIENT_ID,
        clientSecret: process.env.REACT_APP_GWX_CLIENT_SECRET,
        grantType: "client_credentials",
        redirectUri: "urn:ietf:wg:oauth:2.0:oob"
      }
    }
    const accessToken = await authenticateClientCred({ variables: clientCred })
    localStorage.setItem('AUTH_TOKEN', accessToken.data.authenticateClientCred.access_token)
    loginUser({ variables }).then( async response => {
      const result  = await authenticate(clientCred.input.clientId, response.data.loginUser.token, clientCred.input.redirectUri)
      const responseData = await obtainAccess(result.data.getAuthorize.redirect_uri.code)
      localStorage.setItem('AUTH_TOKEN', responseData.data.authenticateCodeGrant.access_token)
      localStorage.setItem('REF_TOKEN', responseData.data.authenticateCodeGrant.refresh_token)
      localStorage.setItem('timeStamp', new Date().getTime())
      if(isNull(response.data.loginUser.user.data.attributes.resetPasswordSentAt)){
        props.history.push('/profile')
      } else {
        Notification.show({
          type: 'info',
          message: 'Please change your password.'
        })
        props.history.push('/change')
      }
    }).catch((errors) => {
      Notification.show({
        type: 'error',
        message: errors.networkError.result.message
      })
    })
    setLoading(false)

  }

  function authenticate(clientId, token, uri){
    const { client } = props
    return client.query({
      query: AUTHENTICATE.AUTHORIZE,
      variables: {
        clientId: clientId,
        token: token,
        redirectUri: uri
      }
    })
  }

  function obtainAccess(code){
    const clientCred = {
      input: {
        clientId: process.env.REACT_APP_GWX_CLIENT_ID,
        clientSecret: process.env.REACT_APP_GWX_CLIENT_SECRET,
        grantType: "authorization_code",
        redirectUri: "urn:ietf:wg:oauth:2.0:oob"
      }
    }
    const variables = { ...clientCred.input, code }
    const newVariables = { input: variables }
    const { authenticateCodeGrant } = props
    return authenticateCodeGrant({ variables: newVariables })
  }

  return (
    <>
      <LoginForm
        inputs={inputs}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  )
}


export default compose(
  withApollo,
  graphql(LOGIN_USER, { name: 'loginUser' }),
  graphql(AUTHENTICATE.AUTHENTICATE_CLIENT_CRED, { name: 'authenticateClientCred' }),
  graphql(AUTHENTICATE.AUTHENTICATE_CODE_GRANT, { name: 'authenticateCodeGrant' })
)(Login)
