import gql from 'graphql-tag'

const GET_WALLET_ACCOUNT = gql`
  query GET_WALLET_ACCOUNT {
    getWalletAccount(walletAddress: $walletAddress)
    @rest(
      type: "Wallet",
      path: "/v1/wallets/{args.walletAddress}",
      method: "GET"
    ) {
      data
    }
  }
`
const GET_WALLET_BALANCE = gql`
  query GET_WALLET_BALANCE {
    getWalletBalance(walletAddress: $walletAddress)
    @rest(
      type: "Wallet",
      path: "/v1/wallets/{args.walletAddress}/balance",
      method: "GET"
    ) {
      balance
    }
  }
`

const GET_ALL_GAMES = gql`
  query getAllGames {
    getAllGames @rest(
      type: "Game",
      path: "/v1/games",
      method: "GET"
    ) {
      data
    }
  }
`


export default {
  GET_WALLET_ACCOUNT,
  GET_WALLET_BALANCE,
  GET_ALL_GAMES
}
