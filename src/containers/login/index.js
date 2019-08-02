import React from "react"
import { compose, graphql, withApollo, Query } from 'react-apollo'

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
    handleSubmit,
    isSubmitting
  } = useForm(login, validateLogin);

  async function login(){
    const { loginUser, authenticateClientCred, getAuthorize } = props
    const variables = { input: inputs }
    const clientCred = {
      input: {
        client_id: "THNqdkclVCxdD6Mh8gDwW9hzlA9qxMhU-FxSdIU3PEA",
        client_secret: "-_u_J1s_7lmPRKCZ7FQfNKqWyL0iW0CEQhPw-ocCXHg",
        grant_type: "client_credentials",
        redirect_uri: "urn:ietf:wg:oauth:2.0:oob"
      }
    }

    const clientId = "THNqdkclVCxdD6Mh8gDwW9hzlA9qxMhU"
    const response = await authenticateClientCred({ variables: clientCred })

    localStorage.setItem('AUTH_TOKEN', response.data.authenticateClientCred.access_token)

    loginUser({ variables }).then( async response => {
      const wasd = await authenticate(clientId, response.data.loginUser.token)
      // localStorage.setItem('AUTH_TOKEN', response.data.loginUser.token)

    }).catch((errors) => {
      console.log(errors)
    })

    //   // if(isNull(response.data.loginUser.user.data.attributes.resetPasswordSentAt)){
    //   //   props.history.push('/wallet')
    //   // } else {
    //   //   Notification.show({
    //   //     type: 'info',
    //   //     message: 'Please change your password.'
    //   //   })
    //   //   props.history.push('/change')
    //   // }
    // }).catch((errors) => {
    //   // Notification.show({
    //   //   type: 'error',
    //   //   message: errors.networkError.result.message
    //   // })
    // })
  }

  async function authenticate(clientId, token){
    const { client } = props
    const redirectUri = "urn:ietf:wg:oauth:2.0:oob"
    const variables = {
      clientId: clientId,
      token: token,
      redirectUri: redirectUri
    }

    console.log(token)

    client.query({
      query: AUTHENTICATE.AUTHORIZE,
      variables
    }).then(response => {
      console.log("Response",response)
    }).catch((errors) => {
      console.log(errors)
    })

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
                loading={isSubmitting}
                className='button btn-primary btn-block btn-lg'
              >Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default compose(
  withApollo,
  graphql(LOGIN_USER, { name: 'loginUser' }),
  graphql(AUTHENTICATE.AUTHENTICATE_CLIENT_CRED, { name: 'authenticateClientCred' })
)(Login)
