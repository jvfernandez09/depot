import gql from 'graphql-tag'


const FORGOT_PASSWORD = gql`
  mutation FORGOT_PASSWORD {
    forgotPassword(input: input)
    @rest(
      type: "ForgotPassword",
      path: "/v1/auth/forgot",
      method: "POST"
    ) {
      message
    }
  }
`

export default FORGOT_PASSWORD
