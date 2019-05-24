import gql from 'graphql-tag'

const LOGIN_USER = gql`
  mutation LOGIN_USER {
    loginUser(input: $input) @rest(
      type: "Login",
      path: "/v1/auth/login",
      method: "POST"
    ) {
      token
    }
  }
`

export default LOGIN_USER
