import gql from 'graphql-tag'

const AUTHENTICATE_CLIENT_CRED = gql`
  mutation AUTHENTICATE_CLIENT_CRED {
    authenticateClientCred(input: $input)
    @rest(
      type: "AuthenticateClientCred",
      path: "/oauth/token",
      method: "POST",
      endpoint: "v1"
    ) {
      access_token
    }
  }
`

const AUTHENTICATE_CODE_GRANT = gql`
  mutation AUTHENTICATE_CODE_GRANT {
    authenticateCodeGrant(input: $input)
    @rest(
      type: "AuthenticateCodeGrant",
      path: "/oauth/token",
      method: "POST",
      endpoint: "v1"
    ) {
      access_token
    }
  }
`

const AUTHORIZE = gql`
  query AUTHORIZE {
    getAuthorize (
      clientId: $clientId,
      redirectUri: $redirectUri,
      token: $token
    )
    @rest(
      type: "AuthorizeUser",
      endpoint: "v1",
      path: "/oauth/authorize?client_id={args.clientId}&redirect_uri={args.redirectUri}&response_type=code&jwt={args.token}"
    ) {
      redirect_uri
    }
  }
`


export default {
  AUTHENTICATE_CLIENT_CRED,
  AUTHENTICATE_CODE_GRANT,
  AUTHORIZE
}
