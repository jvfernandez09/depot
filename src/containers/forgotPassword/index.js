import React, { useState } from 'react'
import useForm from "utils/useForm"
import validateEmail from 'utils/emailFormValidationRules'
import { Input } from 'antd'
import Button from 'components/button'
import 'forgotPassword/index.scss'
import { ReactComponent as Logo } from 'assets/images/LOGO.svg'

import FORGOT_PASSWORD from '../../../src/graphql/forgotPassword'

const ForgotPassword = () => {
  const {
    inputs,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useForm(forgotPassword, validateEmail);

  function forgotPassword(){
    console.log(inputs)
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
                <div className='head'>
                </div>
                <label>Email</label>
                <div className='form-group'>
                  <Input
                    type="email"
                    name="email"
                    onChange={handleChange}
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

export default ForgotPassword
