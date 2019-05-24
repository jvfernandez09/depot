import React from "react"
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

  function login(){
    const variables = inputs
    const { loginUser } = props

    loginUser({ variables }).then(response => {
      console.log(response)
    }).catch(e => {
      console.log(e)
    })

  }


  return (
    <div>
      <div>
        <div>
          <div>
            <form onSubmit={handleSubmit} noValidate>
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
              <button>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default compose(
  withApollo,
  graphql(LOGIN_USER, { name: 'loginUser' })
)(Login)
