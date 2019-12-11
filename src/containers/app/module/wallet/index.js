import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { compose, withApollo, Query } from 'react-apollo'
import { Spin, Card, Button, Modal } from 'antd'
import { isGeolocation } from 'utils/helpers'
import strings from 'utils/strings'

import WalletModal from 'app/module/wallet/wallet_modal'
import useModal from 'app/module/wallet/wallet_modal/useModal'

import WALLET from 'lib/api/wallet'
import GET_PROFILE from 'lib/api/profile'
import ErrorContainer from '../wallet/error'

import '../wallet/index.scss'

const WalletContainer = (props) => {
  const { isShowing, toggle } = useModal()
  const [countryName, setCountryName] = useState('')
  const blackListed = [
    'United States',
    'Syria',
    'Cuba',
    'Iran',
    'Sudan',
    'North Korea'
  ]

  useEffect(() => {
    async function getCountry(){
      const countryName = await isGeolocation()
      setCountryName(countryName)
    }
    getCountry()
  }, [])

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
              <>
                <div className='balance'>
                  <div className='title '>GWX</div>
                  <span className='span-balance' style={{ cursor: 'default', fontSize: '3.5rem'}}>{isNaN(newBalance) ? 0 : newBalance.toLocaleString()}</span>
                  <span style={{ cursor: 'default'}}>.</span>
                  <span style={{ cursor: 'default', fontSize: '1.5rem' }}>{isNaN(convertedBalance[1]) ? '000000' : convertedBalance[1]}</span>
                </div>
              </>
            )
          }}
        </Query>
        {blackListed.includes(countryName) ?
          <Button className='button btn-primary -outline' onClick={() => warning()}> Buy GWX </Button> :
          <Button className='button btn-primary -outline' onClick={toggle}> Buy GWX </Button>
        }
        <WalletModal
          userId={userId}
          isShowing={isShowing}
          hide={toggle}
          gwxWalletAddress={walletAddress}
        />
      </>
    )
  }

  function xemWalletBalance(walletAddress, userId){
    return (
      <>
        <Query
          query={WALLET.GET_WALLET_XEM_BALANCE}
          variables={{ walletAddress }}
          pollInterval={45000}>
          {({ data, loading, error, startPolling, stopPolling }) => {
            if (loading) return <Spin />
            if (error) return <p>{console.log(error)}</p>
            if (data.getWalletXemBalance.balance.xem === undefined) return data.getWalletXemBalance.balance.xem = 0
            const convertedBalance = data.getWalletXemBalance.balance.xem.toFixed(6).split(".")
            const newBalance = parseInt(convertedBalance[0])
            return(
              <>
                <div className='balance'>
                  <div className='title '>XEM</div>
                  <span className='span-balance' style={{ cursor: 'default', fontSize: '3.5rem'}}>{isNaN(newBalance) ? 0 : newBalance.toLocaleString()}</span>
                  <span style={{ cursor: 'default'}}>.</span>
                  <span style={{ cursor: 'default', fontSize: '1.5rem' }}>{isNaN(convertedBalance[1]) ? '000000' : convertedBalance[1]}</span>
                </div>
              </>
            )
          }}
        </Query>
        {blackListed.includes(countryName) ?
          <Button className='button btn-primary -outline' onClick={() => warning() } style={{ visibility: 'hidden' }}> Buy GWX </Button> :
          <Button className='button btn-primary -outline' onClick={toggle} style={{ visibility: 'hidden' }}> Buy GWX </Button>
        }
        <WalletModal
          userId={userId}
          isShowing={isShowing}
          hide={toggle}
          gwxWalletAddress={walletAddress}
        />
      </>
    )
  }

  if(!countryName){
    return <Spin />
  }

  function warning() {
    Modal.warning({
      title: 'This feature is blocked in your country.',
      content: (
        <ErrorContainer />
      ),
      onOk() {},
    });
  }

  return (
    <div className="body-container">
      <Query query={GET_PROFILE}>
        {({ data, loading, error }) => {
          if (loading) return <Spin />
          if (error) return <p>ERROR</p>
          const walletAddress = data.getProfile.data.attributes.walletAddress
          const userId = data.getProfile.data.id
          return (
            <>
              <div className="body-content">
                <h2 className='title'>{strings.my_gwx_wallet}</h2>
                <Card>
                  <div className='wallet-container'>
                    <p className='top'></p>
                    {walletAddress && walletBalance(walletAddress, userId)}
                  </div>
                </Card>
                <h2 className='title'>{strings.my_xem_wallet}</h2>
                <Card>
                  <div className='wallet-container'>
                    <p className='top'></p>
                    {walletAddress && xemWalletBalance(walletAddress, userId)}
                  </div>
                </Card>
                <h2 className='title -pad'>{strings.my_game_wallet}</h2>
                <Card>
                  <div className="wallet-container">
                    <p className='top'></p>
                    <div className='balance'>
                      <span style={{ cursor: 'default'}}>{strings.no_game}</span>
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
  withApollo
)(WalletContainer)


WalletContainer.propTypes = {
  isShowing: PropTypes.func,
  toggle: PropTypes.bool
}
