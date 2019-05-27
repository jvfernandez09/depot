import React from "react"
import { withRouter } from "react-router-dom"

import useForm from "utils/useForm"
import validateLogin from 'utils/LoginFormValidationRules'
import 'login/index.scss'

import { compose, graphql, withApollo } from 'react-apollo'

import LOGIN_USER from '../../../src/graphql/login'

import { Input } from 'antd'

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
        <div>
          <div>
            <form>
              <div>
                <label>Email Address</label>
                <div>
                  <Input type="email" name="email" onChange={handleChange} value={inputs.email || ''} required />
                  {errors.email && (
                    <p className="help is-danger">{errors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <label>Password</label>
                <div>
                  <Input type="password" name="password" onChange={handleChange} value={inputs.password || ''} required />
                </div>
                {errors.password && (
                  <p>{errors.password}</p>
                )}
              </div>
              <button onClick={handleSubmit}>Login</button>
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
