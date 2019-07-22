import gql from 'graphql-tag'


const ALL_TRANSACTIONS = gql`
  query allTransactions {
    getAllTransaction(userId: $userId)
    @rest(
      type: "Transactions",
      path: "/v1/top_up_transactions?user_id={args.userId}",
      method: "GET",
      endpoint: "v2"
    ) {
      data
    }
  }
`

const CREATE_TRANSACTION = gql`
  mutation CREATE_TRANSACTION {
    createTransaction(input: $input)
    @rest(
      type: "Create Transaction",
      path: "/v1/top_up_transactions",
      method: "POST",
      endpoint: "v2"
    ) {
      data
    }
  }
`

const CONVERT_BTC = gql`
  query convertBtc {
    convertAmount(btc: $btc)
    @rest(
      type: "Convert BTC",
      path: "/v1/top_up_transactions/calculate/btc/{args.btc}/to_gwx",
      method: "GET",
      endpoint: "v2"
    ) {
      btc
      gwx
    }
  }
`

const CONVERT_XEM = gql`
  query convertBtc {
    convertAmount(xem: $xem)
    @rest(
      type: "Convert XEM",
      path: "/v1/top_up_transactions/calculate/xem/{args.btc}/to_gwx",
      method: "GET",
      endpoint: "v2"
    ) {
      btc
      gwx
    }
  }
`

const CONVERT_ETH = gql`
  query convertBtc {
    convertAmount(eth: $eth)
    @rest(
      type: "Convert BTC",
      path: "/v1/top_up_transactions/calculate/eth/{args.btc}/to_gwx",
      method: "GET",
      endpoint: "v2"
    ) {
      btc
      gwx
    }
  }
`

export default {
  ALL_TRANSACTIONS,
  CREATE_TRANSACTION,
  CONVERT_BTC,
  CONVERT_XEM,
  CONVERT_ETH
}
