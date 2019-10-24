import React from 'react'
import { compose, graphql, withApollo } from 'react-apollo'

import { Input, Button } from 'antd'

import strings from 'utils/strings'
import useForm from "utils/useForm"
import validateChangePassword from 'utils/changePasswordFormValidationRules'

import CHANGE_PASSWORD from 'lib/api/changePassword'
import Notification from 'utils/notification'
import '../changePassword/index.scss'

const ChangePasswordCotainer = (props) => {
  const {
    inputs,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useForm(changePassword, validateChangePassword)

  function changePassword(){
    const variables = { ...inputs }
    const { changePassword } = props

    const key = Object.keys(variables).map((key) => { return key.split(/(?=[A-Z])/).join('_').toLowerCase() })
    const value = Object.values(variables).map((values) => { return values })

    let newVariables = key.reduce(function(obj, key, index) {
      obj[key] = value[index]
      return obj
    }, {})

    const parameter = { input: newVariables }

    changePassword({ variables: parameter }).then(response => {
      if(response){
        props.history.push('/profile')
        Notification.show({
          type: 'success',
          message: 'Password Updated.'
        })
      }
    }).catch((errors) => {
      Notification.show({
        type: 'error',
        message: errors.networkError.result.errors[0]
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
        <div className='change-session-container'>
          <div className='content'>
            <div className='head'>
            </div>
            <form>
              <div className='form-group'>
                <label>{strings.new_password}</label>
                <div>
                  <Input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onKeyPress={onKeyPress}
                    value={inputs.password || ''}
                    required
                  />
                  {errors.password && (
                    <p style={{ color: 'red'}}>{errors.password}</p>
                  )}
                </div>
              </div>

              <div className='form-group'>
                <label>{strings.confirm_password}</label>
                <div>
                  <Input
                    type="password"
                    name="passwordConfirmation"
                    value={inputs.passwordConfirmation || ''}
                    onKeyPress={onKeyPress}
                    onChange={handleChange}
                    required
                  />
                  {errors.passwordConfirmation && (
                    <p style={{ color: 'red'}}>{errors.passwordConfirmation}</p>
                  )}
                </div>
              </div>
              <Button
                className='button btn-primary btn-block btn-lg'
                onClick={handleSubmit}
                loading={isSubmitting}
              >{strings.confirm}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


export default compose(
  withApollo,
  graphql(CHANGE_PASSWORD, { name: 'changePassword' })
)(ChangePasswordCotainer)
