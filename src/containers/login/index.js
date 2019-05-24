import React from "react"
import useForm from "utils/useForm"
import validateLogin from 'utils/LoginFormValidationRules'


import 'login/index.scss'
import { Input } from 'antd'

const Login = () => {
  const {
    input,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(login, validateLogin);



  function login(){
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
                  <Input type="email" name="email" onChange={handleChange} value={input.email || ''} required />
                  {errors.email && (
                    <p className="help is-danger">{errors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <label>Password</label>
                <div>
                  <Input type="password" name="password" onChange={handleChange} value={input.password || ''} required />
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


export default Login
