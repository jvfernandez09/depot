import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import { Layout } from 'antd';
import 'app/header/index.scss'
import {ReactComponent as Logo} from 'assets/images/LOGO-tokendepot.svg'

import { Menu, Dropdown, Icon, Button } from 'antd';

const { Header } = Layout;

class HeaderContainer extends Component {

  componentDidMount(){
    if (this.props.history.location.pathname === '/') {
      this.props.history.push('/wallet')
    }
  }

  menu = (e) => {
    this.props.history.push(e.domEvent.currentTarget.getAttribute('route'))
  }

  logout = () => {
    localStorage.clear()
    window.location.replace('/')
  }

  render(){

    const userMenu = (
      <Menu className='nav-bar' mode="horizontal">
        <Menu.Item key="1" onClick={this.logout}>
          <label className="logout-icon">Logout<Icon type="logout"/></label>
        </Menu.Item>
      </Menu>
    )

    return (
      <Header className='main-navbar'>
        <div className="nav-container">
          <div className="action">
            <Logo className='logo' onClick={() => this.props.history.push('/wallet')}/>
          </div>
          <div className="options">
            {/* <Menu
              selectedKeys={this.props.history.location.pathname === '/' ? ['wallet'] : [`${this.props.history.location.pathname.substring(1)}`]}
              className="nav-bar"
              mode="horizontal">
              {/* <Menu.Item route='/home' onClick={this.menu} key="1">
                Home
              </Menu.Item> */}
              {/* <Menu.Item route='/wallet' onClick={this.menu} key="wallet">
                Wallet
              </Menu.Item>
              <Menu.Item route='/profile' onClick={this.menu} key="profile">
                Profile
              </Menu.Item>
            </Menu> */}
          </div>
          <div className='user'>
            <div className='avatar'>
            </div>
            <Dropdown overlay={userMenu}>
              <Button className="user-icon"><Icon type="user"/></Button>
            </Dropdown>
          </div>
        </div>
      </Header>
    )
  }
}

export default withRouter(HeaderContainer)
