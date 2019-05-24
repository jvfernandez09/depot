import React, { Component} from 'react'
import { Layout } from 'antd';
import { Link } from 'react-router-dom'

import 'app/header/index.scss'
import { ReactComponent as Logo } from 'images/Gameworks-logo.svg'


const { Header } = Layout;
export default class HeaderContainer extends Component {
  render(){
    return (
      <Header className='main-navbar'>
        <div className="nav-container">
          <div className="action">
            <Logo className='logo' />
          </div>
          <div className="options">
            <Link to="/home">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/wallet">Wallet</Link>
            <Link to="/"> Logout </Link>
          </div>
        </div>
      </Header>
    )
  }
}
