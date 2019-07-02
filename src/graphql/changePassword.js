import gql from 'graphql-tag'


const CHANGE_PASSWORD = gql`
  mutation CHANGE_PASSWORD {
    changePassword(input: $input)
    @rest(
      type: "Change",
      path: "/v1/auth/update_password",
      method: "PUT"
    ) {
      data
    }
  }
`

export default CHANGE_PASSWORD
