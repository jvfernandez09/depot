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
      <Link to='/'>
        <Logo className="logo" />
      </Link>
      <div className='session-container'>
        <div className='content'>
          <div className='head -smallpad'>
            <h1 className='title'>{strings.log_in}</h1>
            <div className='sub'>
              {strings.yourAccountInGameworks}
            </div>
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
                onKeyPress={onKeyPress}
                required
              />
            </Form.Item>
            <Form.Item
              className='form-group -nopad'
              validateStatus={errors.password ? 'error' : ''}
              help={errors.password ? errors.password : ''}
            >
              <label>{strings.password}</label>
              <Input
                type="password"
                name="password"
                required
                value={inputs.password || ''}
                onChange={handleChange}
                onKeyPress={onKeyPress}
              />
            </Form.Item>
            {(errors && errors === 'Invalid Credentials') && (
              <p className="help is-danger">{errors}</p>
            )}
            <div className='others'>
              <Link to='/reset'>{strings.forgot_password}</Link>
            </div>
            <Form.Item className='button-form'>
              <Button
                className='button btn-primary btn-block btn-lg btn-submit'
                onClick={handleSubmit}
                loading={isLoading}
                htmlType="submit"
              >
                {strings.log_in}
              </Button>
            </Form.Item>
            <div className='link-action'>
              <p>Don't have an account?</p>
              <Link to='/register'>Register now!</Link>
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
