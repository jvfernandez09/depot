import gql from 'graphql-tag'

const RATES = gql`
  query rates {
    rates @rest(
      type: "Real time rates",
      path: "/v1/get_current_rate",
      method: "GET",
      endpoint: "v2"
    ) {
      data
    }
  }
`

export default RATES
