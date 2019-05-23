import React from "react"
import useForm from "utils/useForm"
import validateLogin from 'utils/LoginFormValidationRules'
import 'login/index.scss'
import Button from 'components/button'

const Login = () => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(login, validateLogin);

  function login() {
    console.log(values)
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
                  <input type="email" name="email" onChange={handleChange} value={values.email || ''} required />
                  {errors.email && (
                    <p className="help is-danger">{errors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <label>Password</label>
                <div>
                  <input type="password" name="password" onChange={handleChange} value={values.password || ''} required />
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
