import gql from 'graphql-tag'


const FORGOT_PASSWORD = gql`
  mutation FORGOT_PASSWORD {
    forgotPassword(input: $input)
    @rest(
      type: "ForgotPassword",
      path: "/v2/auth/forgot",
      method: "POST",
      endpoint: "v1"
    ) {
      data
    }
  }
`

export default FORGOT_PASSWORD
