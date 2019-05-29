import React, { Component} from 'react'
import {withRouter} from 'react-router-dom';
import { Layout } from 'antd';
import 'app/header/index.scss'
import {ReactComponent as Logo} from 'assets/images/Gameworks-logo.svg'

import { Menu, Icon } from 'antd';

const { Header } = Layout;

class HeaderContainer extends Component {

  menu = (e) => {
    this.props.history.push(e.domEvent.currentTarget.getAttribute('route'))
  }

  logout = () => {
    localStorage.clear()
    window.location.replace('/')
  }

  render(){
    return (
      <Header className='main-navbar'>
        <div className="nav-container">
          <div className="action">
            <Logo className='logo' />
          </div>
          <div className="options">
            <Menu className="nav-bar" mode="horizontal">
              <Menu.Item route='/home' onClick={this.menu} key="1">
                <Icon type="mail" />
                Home
              </Menu.Item>
              <Menu.Item route='/profile' onClick={this.menu} key="2">
                <Icon type="profile" />
                Profile
              </Menu.Item>
              <Menu.Item route='/wallet' onClick={this.menu} key="3">
                <Icon type="wallet" />
                Wallet
              </Menu.Item>
              <Menu.Item onClick={this.logout} key="4">
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

export default withRouter(HeaderContainer)
