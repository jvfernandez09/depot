import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { compose, withApollo, graphql, Query } from 'react-apollo'
import { Spin, Card, Button } from 'antd'

import WalletModal from 'app/module/wallet/wallet_modal'
import useModal from 'app/module/wallet/wallet_modal/useModal'

import WALLET from '../../../../../src/graphql/wallet'
import GET_PROFILE from '../../../../../src/graphql/profile'
import AUTHENTICATE from '../../../../../src/graphql/auth'

import '../wallet/index.scss'

const WalletContainer = (props) => {
  const { isShowing, toggle } = useModal()

  useEffect(() => {
    try{
      const { refToken } = props
      const refreshToken = localStorage.getItem('REF_TOKEN')
      const clientCred = {
        input: {
          clientId: process.env.REACT_APP_GWX_CLIENT_ID,
          clientSecret: process.env.REACT_APP_GWX_CLIENT_SECRET,
          grantType: "refresh_token"
        }
      }
      const variables = { ...clientCred.input, refreshToken: refreshToken }
      setInterval(async () => {
        refToken({ variables: { input: variables } }).then(response =>{
          localStorage.setItem('AUTH_TOKEN', response.data.refToken.access_token)
          localStorage.setItem('REF_TOKEN', response.data.refToken.refresh_token)
        }).catch((errors) => {
          console.log(errors)
        })
      },  7000000)
    }
    catch(e){
      console.log(e)
    }
  })

  function walletBalance(walletAddress, userId){
    return (
      <>
        <Query
          query={WALLET.GET_WALLET_BALANCE}
          variables={{ walletAddress }}
          pollInterval={15000}>
          {({ data, loading, error, startPolling, stopPolling }) => {
            if (loading) return <Spin />
            if (error) return <p>{console.log(error)}</p>
            if (data.getWalletBalance.balance.gwx === undefined) return data.getWalletBalance.balance.gwx = 0
            const convertedBalance = data.getWalletBalance.balance.gwx.toFixed(6).split(".")
            const newBalance = parseInt(convertedBalance[0])
            return(
              <div className='balance'>
                <div className={data.getWalletBalance.balance.unconfirmed_incoming !== 0.0 || data.getWalletBalance.balance.unconfirmed_outgoing !== 0.0 ? '-unconfirmed' : 'title '}>GWX</div>
                <span style={{ fontSize: '3.5rem' }} className={data.getWalletBalance.balance.unconfirmed_incoming !== 0.0 || data.getWalletBalance.balance.unconfirmed_outgoing !== 0.0 ? 'unconfirmed' : ''}>{isNaN(newBalance) ? 0 : newBalance.toLocaleString()}</span>
                <span className={data.getWalletBalance.balance.unconfirmed_incoming !== 0.0 || data.getWalletBalance.balance.unconfirmed_outgoing !== 0.0 ? 'unconfirmed' : ''}>.</span>
                <span style={{ fontSize: '1.5rem' }} className={data.getWalletBalance.balance.unconfirmed_incoming !== 0.0 || data.getWalletBalance.balance.unconfirmed_outgoing !== 0.0 ? 'unconfirmed' : ''}>{isNaN(convertedBalance[1]) ? '000000' : convertedBalance[1]}</span>
              </div>
            )
          }}
        </Query>
        <Button className='button btn-primary -outline' onClick={toggle}> Buy GWX </Button>
        <WalletModal
          userId={userId}
          isShowing={isShowing}
          hide={toggle}
          gwxWalletAddress={walletAddress}
        />
      </>
    )
  }

  function token(){
    const { refToken } = props
    const refreshToken = localStorage.getItem('REF_TOKEN')
    const clientCred = {
      input: {
        clientId: process.env.REACT_APP_GWX_CLIENT_ID,
        clientSecret: process.env.REACT_APP_GWX_CLIENT_SECRET,
        grantType: "refresh_token"
      }
    }
    const variables = { ...clientCred.input, refreshToken: refreshToken }

    refToken({ variables: { input: variables } }).then(response =>{
      localStorage.setItem('AUTH_TOKEN', response.data.refToken.access_token)
      localStorage.setItem('REF_TOKEN', response.data.refToken.refresh_token)
    }).catch((errors) => {
      console.log(errors)
    })
  }

  return (
    <div className="body-container">
    {token()}
      <Query query={GET_PROFILE}>
        {({ data, loading, error }) => {
          if (loading) return <Spin />
          if (error) return <p>ERROR</p>
          const walletAddress = data.getProfile.data.attributes.walletAddress
          const userId = data.getProfile.data.id
          return (
            <>
              <div className="body-content">
                <h2 className='title'>My GWX Wallet</h2>
                <Card>
                  <div className='wallet-container'>
                    <p className='top'></p>
                    {walletAddress && walletBalance(walletAddress, userId)}
                  </div>
                </Card>
                <h2 className='title -pad'>My Game Wallets</h2>
                <Card>
                  <div className="wallet-container">
                    <p className='top'></p>
                    <div className='balance'>
                      <span>You don't have any Game Wallets.</span>
                    </div>
                    <Button style={{ background: 'transparent', border: 'none' }}></Button>
                  </div>
                </Card>
              </div>
            </>
          )
        }}
        </Query>
    </div>
  )
}

export default compose(
  withApollo,
  graphql(AUTHENTICATE.REF_TOKEN, { name: 'refToken'})
)(WalletContainer)


WalletContainer.propTypes = {
  isShowing: PropTypes.func,
  toggle: PropTypes.bool
}
