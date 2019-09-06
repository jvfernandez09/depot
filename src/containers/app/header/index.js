import React, { useEffect, useState } from 'react'
import { compose, withApollo } from 'react-apollo'
import { Layout } from 'antd'
import 'app/header/index.scss'
import { ReactComponent as Logo } from 'assets/images/LOGO-tokendepot.svg'

import { Menu, Dropdown, Icon, Button } from 'antd'
import REAL_TIME_RATES from '../../../../src/graphql/realTimeRates'

const { Header } = Layout;

const HeaderContainer = (props) => {
  const [btc, setBtc] = useState(0)
  const [eth, setEth] = useState(0)
  const [xem, setXem] = useState(0)

  useEffect(() => {
    try{
      setInterval(async ()=> {
        getConversion()
      },  1800000)
    } catch(e){
      console.log(e)
    }
  })

  function getConversion(){
    const { client } = props
    client.query({
      query: REAL_TIME_RATES
    }).then((result) => {
      let btc = 0.019 / parseFloat(result.data.rates.data.attributes.btc_rate)
      let eth = 0.019 / parseFloat(result.data.rates.data.attributes.btc_rate)
      let xem = 0.019 / parseFloat(result.data.rates.data.attributes.btc_rate)
      setBtc(btc.toFixed(8))
      setEth(eth.toFixed(8))
      setXem(xem.toFixed(6))
    }).catch((e) => {
      console.log(e)
    })
  }

  function logout(){
    localStorage.clear()
    window.location.replace('/')
  }

  return (
    <Header className='main-navbar'>
      <div className="nav-container">
        <div className="action">
          <Logo className='logo'/>
        </div>
        <div className='user'>
          <div className='avatar'>
          </div>
          {getConversion()}
          <span style={{ color: '#F8D154'}}> BUY 1 GWX: 0.019 USD | </span>
          <span style={{ color: '#F8D154'}}> {btc} BTC |</span>
          <span style={{ color: '#F8D154'}}> {eth} ETH |</span>
          <span style={{ color: '#F8D154'}}> {xem} XEM </span>
          <Dropdown overlay={
            <Menu className='nav-bar'>
              <Menu.Item key="1" onClick={() => logout()}>
                <Icon style={{ marginRight: 8, color: '#F8D154' }} type="logout"/><label className="logout-icon">Logout</label>
              </Menu.Item>
            </Menu>
          }>
            <Button className="user-icon"><Icon type="user"/></Button>
          </Dropdown>
        </div>
      </div>
    </Header>
  )
}

export default compose(
  withApollo,
)(HeaderContainer)
