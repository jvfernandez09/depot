import React from 'react'
import { compose, withApollo, Query } from 'react-apollo'
import { Spin, Tabs, Card, Button, Icon } from 'antd'

import WalletModal from 'app/module/wallet/wallet_modal'
import useModal from 'app/module/wallet/wallet_modal/useModal'

import GameWalletModal from 'app/module/wallet/game_wallet_modal'
import useGameModal from 'app/module/wallet/game_wallet_modal/useGameModal'

import TransactionContainer from 'app/module/transaction'
import ProfileContainer from 'app/module/profile'
import WALLET from '../../../../../src/graphql/wallet'
import GET_PROFILE from '../../../../../src/graphql/profile'

import '../wallet/index.scss'
import {ReactComponent as SampleGame} from 'assets/images/sample-game.svg'

const { TabPane } = Tabs;

const WalletContainer = (props) => {
  const { isShowing, toggle } = useModal()
  const { isGameShowing, gameToggle } = useGameModal()

  function walletBalance(walletAddress, userId){
    return (
      <>
        <Query query={WALLET.GET_WALLET_BALANCE} variables={{ walletAddress }} fetchPolicy='network-only'>
          {({ data, loading, error }) => {
            if (loading) return <Spin />
            if (error) return <p>ERROR</p>
            const convertedBalance = (data.getWalletBalance.balance.gwx + "").split(".")
            const newBalance = parseInt(convertedBalance[0])
            return(
              <div className='balance'>
                <div className='title'>GWX</div>
                <span style={{ fontSize: '3.5rem' }}>{newBalance.toLocaleString()}</span><span>.</span><span style={{ fontSize: '1.5rem' }}>{convertedBalance[1]}</span>
              </div>
            )
          }}
        </Query>
        <Button className='button btn-primary -outline' onClick={toggle}> Buy GWX </Button>
        <WalletModal
         props={props}
         userId={userId}
         isShowing={isShowing}
         hide={toggle}
         walletAddress={walletAddress}
        />
      </>
    )
  }

  function xemWalletBalance(walletAddress) {
    return (
      <>
        <Query query={WALLET.GET_WALLET_BALANCE} variables={{ walletAddress }} fetchPolicy='network-only'>
          {({ data, loading, error }) => {
            if (loading) return <Spin />
            if (error) return <p>ERROR</p>
            const convertedXEMBalance = (data.getWalletBalance.balance.xem + "").split(".")
            const newBalance = parseInt(convertedXEMBalance[0])
            return(
              <div className='balance -small'>
                <div className='title'>XEM</div>
                <span style={{ fontSize: '3rem'}}>{newBalance.toLocaleString()}</span><span>.</span><span style={{ fontSize: '1rem' }}>{convertedXEMBalance[1]}</span>
              </div>
            )
          }}
        </Query>
        <Button className='hide-button'> Buy GWX+ </Button>
      </>
    )
  }

  return(
    <div className="body-container" >
      <Query query={GET_PROFILE}>
        {({ data, loading, error }) => {
          if (loading) return <Spin />
          if (error) return <p>ERROR</p>
          const firstName = data.getProfile.data.attributes.firstName
          const lastName = data.getProfile.data.attributes.lastName.slice(-1) === 's' ?
            data.getProfile.data.attributes.lastName : data.getProfile.data.attributes.lastName+"'s"
          const walletAddress = data.getProfile.data.attributes.walletAddress
          const userId = data.getProfile.data.id

          return (
            <>
              <h1 className='header'>{firstName+' '+lastName} PERSONAL WALLET</h1>
              <Tabs tabPosition='left'>
                <TabPane tab={<span><Icon type='wallet' />My Wallets</span>} key='1'>
                  <div className="body-content">
                    <h2 className='title'>My GWX Wallet</h2>
                    <Card>
                      <div className='wallet-container'>
                        <p className='top'>Amount:</p>
                        {walletAddress && walletBalance(walletAddress, userId)}
                      </div>
                    </Card>
                    <h2 className='title -pad'>My XEM Wallet</h2>
                    <Card>
                      <div className='wallet-container'>
                        <p className='top'>Amount:</p>
                        {walletAddress && xemWalletBalance(walletAddress)}
                      </div>
                    </Card>
                    <h2 className='title -pad'>My Game Wallets</h2>
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
                          <div className='action' onClick={gameToggle}>
                            + Add GWX
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
                          <div className='action' onClick={gameToggle}>
                            + Add GWX
                          </div>
                        </div>
                       </div>
                       <GameWalletModal
                        isGameShowing={isGameShowing}
                        hide={gameToggle}
                        walletAddress={walletAddress}
                       />
                    </Card>
                  </div>
                </TabPane>
                <TabPane tab={<span><Icon type='profile' />My Profile</span>} key='2'>
                  <ProfileContainer />
                </TabPane>
                <TabPane tab={<span><Icon type='table' />Transaction History</span>} key='3'>
                  <TransactionContainer />
                </TabPane>
              </Tabs>
            </>
          )
        }}
      </Query>
    </div>
  )
}

export default compose(
  withApollo
)(WalletContainer)
