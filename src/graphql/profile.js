import gql from 'graphql-tag'

const GET_PROFILE = gql`
  query getProfile {
    getProfile @rest(
      type: "Profile",
      path: "/v1/auth/me",
      method: "GET"
    ) {
      data
    }
  }
`

export default GET_PROFILE
