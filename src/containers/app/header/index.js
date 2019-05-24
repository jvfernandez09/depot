import React, { Component} from 'react'
import { Layout } from 'antd';
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
          </div>
        </div>
      </Header>
    )
  }
}
