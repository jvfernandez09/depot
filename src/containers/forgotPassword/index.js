import React from 'react'
import { compose, graphql, withApollo } from 'react-apollo'

import useForm from "utils/useForm"
import validateEmail from 'utils/emailFormValidationRules'
import Notification from 'utils/notification'
import { ReactComponent as Logo } from 'assets/images/LOGO.svg'

import { Input } from 'antd'
import Button from 'components/button'
import 'forgotPassword/index.scss'

import FORGOT_PASSWORD from '../../../src/graphql/forgotPassword'

const ForgotPassword = (props) => {
  const {
    inputs,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useForm(resetPassword, validateEmail);

  async function resetPassword(){
    const { forgotPassword } = props
    const variables = { input: inputs }

    forgotPassword({ variables }).then(response => {
      if(response){
        Notification.show({
          type: 'success',
          message: 'Temporary password was sent to your e-mail. Please change password after login.'
        })
        props.history.push('/login')
      }
    }).catch((errors) => {
      console.log(errors)
    })
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
                <label>Email</label>
                <div className='form-group'>
                  <Input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={inputs.email || ''}
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
                > Send Temporary Password
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
  graphql(FORGOT_PASSWORD, { name: 'forgotPassword' })
)(ForgotPassword)
