import gql from 'graphql-tag'



const AUTHENTICATE_CLIENT_CRED = gql`
  mutation authenticateClientCred {
    authenticateClientCred(input: $input)
    @rest(
      type: "Authenticate Client Cred",
      path: "/v2/oauth/token",
      method: "POST",
      endpoint: "v1"
    ) {
      client_credential
    }
  }
`

const AUTHENTICATE_CODE_GRANT = gql`
  mutation authenticateCodeGrant {
    authenticateCodeGrant(input: $input)
    @rest(
      type: "Authenticate Code Grant",
      path: "/v2/oauth/token",
      method: "POST",
      endpoint: "v1"
    ) {
      client_credential
    }
  }
`

const AUTHORIZE = gql`
  query authorize {
    getAuthorize @rest(
      type: "Authorize User",
      path: "/v2/oauth/authorize?client_id{args.clientId}&redirect_uri={args.redirectUri}&response_type=code&jwt={args.token}",
      method: "GET",
      endpoint: "v1"
    ) {
      data
    }
  }
`
export default {
  AUTHENTICATE_CLIENT_CRED,
  AUTHENTICATE_CODE_GRANT,
  AUTHORIZE
}
