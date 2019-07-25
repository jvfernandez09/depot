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
          <Icon style={{ marginRight: 8, color: '#F8D154' }} type="logout"/><label className="logout-icon">Logout</label>
        </Menu.Item>
      </Menu>
    )

    return (
      <Header className='main-navbar'>
        <div className="nav-container">
          <div className="action">
            <Logo className='logo' onClick={() => this.props.history.push('/wallet')}/>
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
