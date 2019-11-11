import React, { useState } from 'react'
import { compose, graphql, withApollo } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Form } from 'antd'

import useForm from "utils/useForm"
import validateEmail from 'utils/emailFormValidationRules'
import Notification from 'utils/notification'
import strings from 'utils/strings'

import { ReactComponent as Logo } from 'assets/images/token-depot.svg'

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
    handleSubmit
  } = useForm(resetPassword, validateEmail);
  const [isLoading, setIsLoading] = useState(false)

  async function resetPassword(){
    setIsLoading(true)
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
      console.log(errors.networkError.result)
      Notification.show({
        type: 'error',
        message: "Couldn't Find User"
      })
    })
    setIsLoading(false)
  }

  return (
    <div className='container session-layout'>
    <div className='item'>
      <Link to='/'>
        <Logo className='logo'/>
      </Link>
      <div className='session-container'>
        <div className='content'>
          <div className='head -smallpad'>
            <h1 className='title'>{strings.reset_password}</h1>
          </div>
          <Form>
            <Form.Item
              className='form-group'
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email ? errors.email : ''}
            >
              <label>{strings.email_address}</label>
              <Input
                type="email"
                name="email"
                value={inputs.email || ''}
                onChange={handleChange}
                required
              />
            </Form.Item>
            {(errors && errors === 'Email address not found') && (
              <p className="help is-danger">{errors}</p>
            )}
            <Form.Item className='button-form'>
              <Button
                className='button btn-primary btn-block btn-lg'
                onClick={handleSubmit}
                loading={isLoading}
                htmlType="submit"
              >
                {strings.reset_password}
              </Button>
            </Form.Item>
            <div className='link-action'>
              <p>Already have an account?</p>
              <Link to='/login'>Log in</Link>
            </div>
          </Form>
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
