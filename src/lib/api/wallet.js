import gql from 'graphql-tag'

const GET_WALLET_ACCOUNT = gql`
  query GET_WALLET_ACCOUNT {
    getWalletAccount(walletAddress: $walletAddress)
    @rest(
      type: "Wallet",
      path: "/v2/wallets/{args.walletAddress}",
      method: "GET",
      endpoint: "v1"
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
      path: "/v2/wallets/{args.walletAddress}/balance",
      method: "GET",
      endpoint: "v1"
    ) {
      balance
    }
  }
`
const GET_WALLET_XEM_BALANCE = gql`
  query GET_WALLET_XEM_BALANCE {
    getWalletXemBalance(walletAddress: $walletAddress)
    @rest(
      type: "Wallet",
      path: "/v1/wallets/{args.walletAddress}/balance/xem",
      method: "GET",
      endpoint: "v1"
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
      method: "GET",
      endpoint: "v1"
    ) {
      data
    }
  }
`

export default {
  GET_WALLET_ACCOUNT,
  GET_WALLET_BALANCE,
  GET_ALL_GAMES,
  GET_WALLET_XEM_BALANCE
}
