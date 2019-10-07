import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import strings from 'utils/strings'
import Input from 'components/input'
import Button from 'components/button'
import {ReactComponent as Logo} from 'assets/images/LOGO.svg'
import 'login/index.scss'

const LoginForm = ({
  inputs,
  errors,
  handleChange,
  handleSubmit,
  isLoading }) => {


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
                <label>{strings.email_address}</label>
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
                <label>{strings.password}</label>
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
                  <a href='/reset'> {strings.forgot_password}</a>
                </div>
              </div>
              <Button
                onClick={handleSubmit}
                loading={isLoading}
                className='button btn-primary btn-block btn-lg'
              >Login
              </Button>
              <div className='form-group'>
                <div className='register'>
                  <span className='register-font'> {strings.no_account}</span>
                  <Link to="/register">{strings.register_now}</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm


LoginForm.propTypes = {
  inputs: PropTypes.object,
  errors: PropTypes.object,
  handleSumit: PropTypes.func,
  handleChange: PropTypes.func,
  isLoading: PropTypes.bool,
  onKeyPress: PropTypes.func
}
