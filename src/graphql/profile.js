import gql from 'graphql-tag'

const GET_PROFILE = gql`
  query getProfile {
    getProfile @rest(
      type: "Profile",
      path: "/v2/auth/me",
      method: "GET",
      endpoint: "v1"
    ) {
      data
    }
  }
`

export default GET_PROFILE
