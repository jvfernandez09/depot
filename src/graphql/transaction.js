import gql from 'graphql-tag'


const ALL_TRANSACTIONS = gql`
  query allTransactions {
    getWalletAccount(userId: $userId)
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
      token
      user
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



export default {
  ALL_TRANSACTIONS,
  CREATE_TRANSACTION,
  CONVERT_BTC
}
