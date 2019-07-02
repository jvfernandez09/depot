import React from 'react'
import { compose, graphql, withApollo } from 'react-apollo'

import { Input, Button } from 'antd'

import useForm from "utils/useForm"
import validateChangePassword from 'utils/changePasswordFormValidationRules'

import CHANGE_PASSWORD from '../../../../../../src/graphql/changePassword'

const ChangePasswordCotainer = (props) => {
  const {
    inputs,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useForm(changePassword, validateChangePassword)

  function changePassword(){
    const variables = { input: inputs }
    const { changePassword } = props

    changePassword({ variables }).then(response => {
      console.log(response)
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
            </div>
            <form>
              <div className='form-group'>
                <label>New Password</label>
                <div>
                  <Input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={inputs.password || ''}
                    required
                  />
                  {errors.password && (
                    <p style={{ color: 'red'}}>{errors.password}</p>
                  )}
                </div>
              </div>

              <div className='form-group'>
                <label>Confirm Password</label>
                <div>
                  <Input
                    type="password"
                    name="passwordConfirmation"
                    value={inputs.passwordConfirmation || ''}
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
              >Confirm
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
