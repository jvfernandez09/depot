import React, { Component} from 'react'
import { Layout } from 'antd';
import 'app/header/index.scss'


const { Header } = Layout;
const tokenDepotLogo = require('images/Gameworks-logo.svg')

export default class HeaderContainer extends Component {
  render(){
    return (
      <Header className='main-navbar'>
        <div className="nav-container">
          <div className="action">
            <img className='logo' src={tokenDepotLogo} />
          </div>
          <div className="options">
          </div>
        </div>
      </Header>
    )
  }
}
