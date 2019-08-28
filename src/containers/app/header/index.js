import React, { useEffect, useState } from 'react'
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
        const res = await fetch("http://api.coinlayer.com/live?access_key=db606cd5788e91d14bac4c187e0df218")
        const blocks = await res.json()
        setBtc(blocks.rates.BTC)
        setEth(blocks.rates.ETH)
        setXem(blocks.rates.XEM)
      },  60000)
    } catch(e){
      console.log(e)
    }
  })

  function logout(){
    localStorage.clear()
    window.location.replace('/')
  }

  function getConversion(){
    fetch("http://api.coinlayer.com/live?access_key=db606cd5788e91d14bac4c187e0df218")
      .then(res => res.json())
      .then((result) => {
        setBtc(result.rates.BTC)
        setEth(result.rates.ETH)
        setXem(result.rates.XEM)
      })
  }

  return (
    <Header className='main-navbar'>
      <div className="nav-container">
        <div className="action">
          <Logo className='logo' onClick={() => props.history.push('/wallet')}/>
        </div>
        <div className='user'>
          <div className='avatar'>
          </div>
          {getConversion()}
          <span style={{ color: '#F8D154'}}> BTC: {btc} |</span>
          <span style={{ color: '#F8D154'}}> ETH: {eth} |</span>
          <span style={{ color: '#F8D154'}}> XEM: {xem} </span>
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

export default HeaderContainer
