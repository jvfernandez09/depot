import React, { Fragment } from 'react'
import { compose, withApollo, Query } from 'react-apollo'
import { Tabs } from 'antd'

import TransactionContainer from 'app/module/transaction'
import WALLET from '../../../../../src/graphql/wallet'
import '../wallet/index.scss'

const { TabPane } = Tabs;

const WalletContainer = (props) => {
  const walletAddress = localStorage.getItem('walletAddress')
  return(
    <Fragment>
      <div className="body-container">
        <Tabs tabPosition='left'>
          <TabPane tab='My Wallet' key='1'>
            <div className="body-content">
              <Query query={WALLET.GET_WALLET_BALANCE} variables={{ walletAddress }}>
                {({ data, loading, error }) => {
                  if (loading) return <p> Loading </p>
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
          </TabPane>
          <TabPane tab='Transaction History' key='2'>
            <TransactionContainer />
          </TabPane>
        </Tabs>
     </div>
    </Fragment>
  )
}

export default compose(
  withApollo
)(WalletContainer)
