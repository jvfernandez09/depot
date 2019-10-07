import React from 'react'
import { compose, graphql, withApollo } from 'react-apollo'

import useForm from "utils/useForm"
import validateEmail from 'utils/emailFormValidationRules'
import Notification from 'utils/notification'
import strings from 'utils/strings'

import { ReactComponent as Logo } from 'assets/images/LOGO.svg'

import { Input } from 'antd'
import Button from 'components/button'
import 'forgotPassword/index.scss'
import AUTHENTICATE from 'lib/api/auth'
import FORGOT_PASSWORD from 'lib/api/forgotPassword'

const ForgotPassword = (props) => {
  const {
    inputs,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useForm(resetPassword, validateEmail);

  async function resetPassword(){
    const variables = { input: inputs }
    const { forgotPassword, authenticateClientCred } = props
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
    forgotPassword({ variables }).then(response => {
      if(response){
        Notification.show({
          type: 'success',
          message: 'Temporary password was sent to your e-mail. Please change password after login.'
        })
        props.history.push('/login')
      }
    }).catch((errors) => {
      Notification.show({
        type: 'error',
        message: errors.networkError.result.message
      })
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
                <div className='head'>
                </div>
                <label>{strings.email}</label>
                <div className='form-group'>
                  <Input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onKeyPress={onKeyPress}
                    value={inputs.email}
                    required
                  />
                  {errors.email && (
                    <p style={{ color: 'red'}}>{errors.email}</p>
                  )}
                </div>
                <Button
                  className='button btn-primary btn-block btn-lg'
                  onClick={handleSubmit}
                  loading={isSubmitting}
                > {strings.temporary_password}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default compose(
  withApollo,
  graphql(FORGOT_PASSWORD, { name: 'forgotPassword' }),
  graphql(AUTHENTICATE.AUTHENTICATE_CLIENT_CRED, { name: 'authenticateClientCred' })
)(ForgotPassword)
