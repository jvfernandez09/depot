import React, { Fragment } from 'react'
import { compose, withApollo, Query } from 'react-apollo'
import { Spin, Tabs, Card, Button, Icon } from 'antd'

import TransactionContainer from 'app/module/transaction'
import WALLET from '../../../../../src/graphql/wallet'
import '../wallet/index.scss'
import {ReactComponent as SampleGame} from 'assets/images/sample-game.svg'

const { TabPane } = Tabs;

const WalletContainer = (props) => {
  const walletAddress = localStorage.getItem('walletAddress')
  return(
    <Fragment>
      <div className="body-container">
        <h1 className='header'>Bruce Lee's Personal Wallet</h1>
        <Tabs tabPosition='left'>
          <TabPane tab={<span><Icon type='wallet' />My Wallet</span>} key='1'>
            <div className="body-content">
              <h2 className='title'>Wallet</h2>
              <Card>
                <div className='wallet-container'>
                  <p className='top'>Wallet Balance</p>
                  <Query query={WALLET.GET_WALLET_BALANCE} variables={{ walletAddress }} fetchPolicy='network-only'>
                    {({ data, loading, error }) => {
                      if (loading) return <p> Loading </p>
                      if (error) return <p>ERROR</p>
                      const convertedBalance = (data.getWalletBalance.balance.gwx + "").split(".")
                      return(
                        <div className='balance'>
                          <div className='title'>GWX</div>
                          <span style={{ fontSize: '3.5rem' }}>{convertedBalance[0]}</span><span>.</span><span style={{ fontSize: '1.5rem' }}>{convertedBalance[1]}</span>
                        </div>
                      )
                    }}
                  </Query>
                  <Button className='button btn-primary -outline'> + Add Funds </Button>
                </div>
              </Card>
              <h2 className='title'>Game List</h2>
              <Card>
                <div className='game-card'> 
                  <div className='info'>
                    <div className='image'>
                      <SampleGame />
                    </div>
                    <div className='game-details'>
                      <h1 className='title'>
                        Crypto Keno
                      </h1>
                      <div className='time'>
                        <p>87 hrs on record</p>
                        <p>last played on Dec, 2018</p>
                      </div>
                    </div>
                  </div>
                  <div className='right'>
                    <h2 className='item'>
                      GWX 225
                    </h2>
                    <div className='action'>
                      + Add Funds
                    </div>
                  </div>
                 </div>
                 <div className='card-divider'></div>
                 <div className='game-card'> 
                  <div className='info'>
                    <div className='image'>
                      <SampleGame />
                    </div>
                    <div className='game-details'>
                      <h1 className='title'>
                        Crypto Keno
                      </h1>
                      <div className='time'>
                        <p>87 hrs on record</p>
                        <p>last played on Dec, 2018</p>
                      </div>
                    </div>
                  </div>
                  <div className='right'>
                    <h2 className='item'>
                      GWX 225
                    </h2>
                    <div className='action'>
                      + Add Funds
                    </div>
                  </div>
                 </div>
              </Card>
            </div>
          </TabPane>
          <TabPane tab={<span><Icon type='table' />Transaction History</span>} key='2'>
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
