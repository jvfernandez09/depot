import React, { Fragment } from 'react'
import { compose, withApollo, Query } from 'react-apollo'
import { Tabs, Card, Button } from 'antd'

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
              Wallet
              <Card>
              Wallet Balance
                <Query query={WALLET.GET_WALLET_BALANCE} variables={{ walletAddress }} fetchPolicy='network-only'>
                  {({ data, loading, error }) => {
                    if (loading) return <p> Loading </p>
                    if (error) return <p>ERROR</p>
                    const convertedBalance = (data.getWalletBalance.balance.gwx + "").split(".")
                    return(
                      <div>
                        <div>
                          GWX BALANCE :
                          <span style={{ fontSize: '64px' }}>{convertedBalance[0]}</span><span>.</span><span style={{ fontSize: '20px' }}>{convertedBalance[1]}</span>
                          <Button class='primary-btn'> Add Funds+ </Button>
                        </div>
                      </div>
                    )
                  }}
                </Query>
              </Card>
              Game List
              <Card>
                <Card> Crypto Keno <Button className='primary-btn'> Add Funds+ </Button>
                 </Card>
                <Card> Shaker  <Button className='primary-btn'> Add Funds+ </Button> 
                </Card>
              </Card>
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
