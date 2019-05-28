import React, { Component} from 'react'
import { Layout } from 'antd';

import 'app/header/index.scss'
import {ReactComponent as Logo} from 'assets/images/Gameworks-logo.svg'

import { Menu, Icon } from 'antd';

const { Header } = Layout;
export default class HeaderContainer extends Component {

  logout(){
    localStorage.clear()
  }

  render(){
    return (
      <Header className='main-navbar'>
        <div className="nav-container">
          <div className="action">
            <Logo className='logo' />
          </div>
          <div className="options">
            <Menu mode="horizontal">
              <Menu.Item key="1">
                <Icon type="mail" />
                Home
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="profile" />
                Profile
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="wallet" />
                Wallet
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="logout" />
                Logout
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </Header>
    )
  }
}
