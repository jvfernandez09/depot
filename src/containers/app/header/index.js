import React, { useEffect, useState } from 'react'
import {withRouter} from 'react-router-dom';
import { Layout } from 'antd';
import 'app/header/index.scss'
import { ReactComponent as Logo } from 'assets/images/LOGO-tokendepot.svg'

import { Menu, Dropdown, Icon, Button } from 'antd';

const { Header } = Layout;

const HeaderContainer = (props) => {
  const [btc, setBtc] = useState(0)
  const [eth, setEth] = useState(0)
  const [xem, setXem] = useState(0)

  useEffect(() => {
    if (props.history.location.pathname === '/') {
      props.history.push('/wallet')
    }
    try{
      setInterval(async ()=> {
        // const res = await fetch(`http://api.coinlayer.com/live?access_key=${process.env.REACT_APP_GWX_ACCESS_KEY}`)
        // const blocks = await res.json()
        // let btc = 0.003 / parseFloat(blocks.rates.BTC)
        // let eth = 0.003 / parseFloat(blocks.rates.ETH)
        // let xem = 0.003 / parseFloat(blocks.rates.XEM)
        let btc = 0
        let eth = 0
        let xem = 0
        setBtc(btc.toFixed(8))
        setEth(eth.toFixed(8))
        setXem(xem.toFixed(6))
      },  600000)
    } catch(e){
      console.log(e)
    }
  })

  function logout(){
    localStorage.clear()
    window.location.replace('/')
  }

  function getConversion(){
    fetch(`http://api.coinlayer.com/live?access_key=${process.env.REACT_APP_GWX_ACCESS_KEY}`)
      .then(res => res.json())
      .then((result) => {
        // let btc = 0.003 / parseFloat(result.rates.BTC)
        // let eth = 0.003 / parseFloat(result.rates.ETH)
        // let xem = 0.003 / parseFloat(result.rates.XEM)
        let btc = 0
        let eth = 0
        let xem = 0
        setBtc(btc.toFixed(8))
        setEth(eth.toFixed(8))
        setXem(xem.toFixed(6))
      }).catch((e) => {
        let btc = 0
        let eth = 0
        let xem = 0
        setBtc(btc.toFixed(8))
        setEth(eth.toFixed(8))
        setXem(xem.toFixed(6))
      })
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
          <span style={{ color: '#F8D154'}}> BUY 1 GWX: 0.003 USD | </span>
          <span style={{ color: '#F8D154'}}> {btc} BTC |</span>
          <span style={{ color: '#F8D154'}}> {eth} ETH |</span>
          <span style={{ color: '#F8D154'}}> {xem} XEM </span>
          <Dropdown overlay={
            <Menu className='nav-bar'>
              <Menu.Item key="1" onClick={() => logout  ()}>
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

export default withRouter(HeaderContainer)
