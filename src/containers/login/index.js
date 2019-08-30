import React, { useState } from "react"
import { compose, graphql, withApollo } from 'react-apollo'

import useForm from "utils/useForm"
import validateLogin from 'utils/LoginFormValidationRules'
import 'login/index.scss'
import Input from 'components/input'
import Button from 'components/button'
import {ReactComponent as Logo} from 'assets/images/LOGO.svg'
import { isNull } from 'lodash'

import LOGIN_USER from '../../../src/graphql/login'
import AUTHENTICATE from '../../../src/graphql/auth'

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
      if(isNull(response.data.loginUser.user.data.attributes.resetPasswordSentAt)){
        props.history.push('/wallet')
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

  function onKeyPress(e){
    if(e.which === 13) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div>
      <div>
        <div className='session-container'>
          <div className='content'>
            <div className='head'>
              <Logo className='logo' />
            </div>
            <form>
              <div className='form-group'>
                <label>Email Address</label>
                <div>
                  <Input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    onKeyPress={onKeyPress}
                    value={inputs.email || ''}
                    required
                  />
                  {errors.email && (
                    <p style={{ color: 'red'}}>{errors.email}</p>
                  )}
                </div>
              </div>

              <div className='form-group'>
                <label>Password</label>
                <div>
                  <Input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onKeyPress={onKeyPress}
                    value={inputs.password || ''}
                    required
                  />
                </div>
                {errors.password && (
                  <p style={{ color: 'red'}}>{errors.password}</p>
                )}
                <div className='forgot-pass'>
                  <a href='/reset'> Forgot password? </a>
                </div>
              </div>
              <Button
                onClick={handleSubmit}
                loading={isLoading}
                className='button btn-primary btn-block btn-lg'
              >Login
              </Button>
            </form>
              <span style={{ color: '#F8D154', zIndex: '999'}}> Don't have any account?</span>
              <a href="https://play.google.com/store/apps/details?id=com.gameworksmobilewallet"> Register Now! </a>
          </div>
        </div>
      </div>
    </div>
  );
};


export default compose(
  withApollo,
  graphql(LOGIN_USER, { name: 'loginUser' }),
  graphql(AUTHENTICATE.AUTHENTICATE_CLIENT_CRED, { name: 'authenticateClientCred' }),
  graphql(AUTHENTICATE.AUTHENTICATE_CODE_GRANT, { name: 'authenticateCodeGrant' })
)(Login)
