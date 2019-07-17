import gql from 'graphql-tag'


const ALL_TRANSACTIONS = gql`
  query allTransactions {
    getWalletAccount(userId: $userId)
    @rest(
      type: "Transactions",
      path: "/top_up_transactions/{args.userId}",
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
      type: "Transaction",
      path: "/top_up_transactions",
      method: "POST",
      endpoint: "v2"
    ) {
      token
      user
    }
  }
`

export default {
  ALL_TRANSACTIONS,
  CREATE_TRANSACTION
}
