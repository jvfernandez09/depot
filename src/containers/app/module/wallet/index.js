import React from 'react'
import { compose, withApollo, Query } from 'react-apollo'
import { Spin } from 'antd'
import WALLET from '../../../../../src/graphql/wallet'

const WalletContainer = (props) => {
  const walletAddress = localStorage.getItem('walletAddress')
  return(
    <div>
      <Query query={WALLET.GET_WALLET_BALANCE} variables={{ walletAddress }} fetchPolicy='network-only'>
        {({ data, loading, error }) => {
          if (loading) return <Spin />
          if (error) return <p>ERROR</p>
          return(
            <div>
              <div>XEM BALANCE : {data.getWalletBalance.balance.xem}</div>
              <div>GWX BALANCE : {data.getWalletBalance.balance.gwx}</div>

            </div>
          )
        }}
      </Query>
    </div>
  )
}

export default compose(
  withApollo
)(WalletContainer)
