import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import strings from 'utils/strings'
import Input from 'components/input'
import Button from 'components/button'
import { ReactComponent as Logo } from 'assets/images/token-depot.svg'
import 'login/index.scss'
import { Form } from 'antd'

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
    <div className='container session-layout'>
      <div className='item'>
        <a href ="/"> <Logo className='logo' /> </a>
        <div className='session-container'>
          <div className='content'>
          <div className='head -smallpad'>
            <h1 className='title'>Log in</h1>
            <div className='sub'>
              YOUR ACCOUNT IN GAMEWORKS
            </div>
          </div>
            <Form>
              <Form.Item
                className='form-group'
                validateStatus={errors.email ? 'error' : ''}
                help={errors.email ? errors.email : ''}
              >
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
                </div>
              </Form.Item>
              <Form.Item
                className='form-group'
                validateStatus={errors.password ? 'error' : ''}
                help={errors.password ? errors.password : ''}
              >
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
                <div className='forgot-pass'>
                  <a href='/reset'> {strings.forgot_password}</a>
                </div>
              </Form.Item>
              <Form.Item>
                <Button
                  onClick={handleSubmit}
                  loading={isLoading}
                  className='button btn-primary btn-block btn-lg'
                >{strings.log_in}
                </Button>
              </Form.Item>
              <div className='form-group'>
                <div className='link-action'>
                  <p> {strings.no_account}</p>
                  <Link to="/register">{strings.register_now}</Link>
                </div>
              </div>
            </Form>
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
