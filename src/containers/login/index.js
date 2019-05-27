import React from "react"
import { withRouter } from "react-router-dom"

import useForm from "utils/useForm"
import validateLogin from 'utils/LoginFormValidationRules'
import 'login/index.scss'
import Input from 'components/input'
import Button from 'components/button'
import { ReactComponent as Logo } from 'images/Gameworks-logo.svg'

import { compose, graphql, withApollo } from 'react-apollo'

import LOGIN_USER from '../../../src/graphql/login'

// import { Input } from 'antd'

const Login = (props) => {
  const {
    inputs,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(login, validateLogin);


  async function login(){
    const variables = { input: inputs }
    const { loginUser } = props

    loginUser({ variables }).then(response => {
      localStorage.setItem('AUTH_TOKEN', response.data.loginUser.token)
      localStorage.setItem('walletAddress', response.data.loginUser.user.data.attributes.walletAddress)
    }).then(() => {
      props.history.push('/')
    }).catch((e) => {
      console.error(e)
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
                <label>Email Address</label>
                <div>
                  <Input type="email" name="email" onChange={handleChange} value={inputs.email || ''} required />
                  {errors.email && (
                    <p className="help is-danger">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className='form-group'>
                <label>Password</label>
                <div>
                  <Input type="password" name="password" onChange={handleChange} value={inputs.password || ''} required />
                </div>
                {errors.password && (
                  <p>{errors.password}</p>
                )}
              </div>
              <Button onClick={handleSubmit} className='btn-primary btn-block btn-lg'>Login</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default compose(
  withRouter,
  withApollo,
  graphql(LOGIN_USER, { name: 'loginUser' })
)(Login)
