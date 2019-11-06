
import React, {useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import { Layout } from 'antd'
import 'app/header/index.scss'
import { ReactComponent as Logo } from 'assets/images/LOGO-tokendepot.svg'
import Rate from 'app/header/rates'
import Logout from 'app/header/logout'
import RefreshToken from 'app/header/refreshToken'

const { Header } = Layout;

const HeaderContainer = (props) => {

  useEffect(() => {
    if (props.history.location.pathname === '/') {
       props.history.push('/profile')
    }
  })
  return (
    <Header className='main-navbar'>
      <RefreshToken />
      <div className="nav-container">
        <div className="action">
          <Logo className='logo'/>
        </div>
        <div className='user'>
          <div className='avatar'>
          </div>
          <Rate />
          <Logout />
        </div>
      </div>
    </Header>
  )
}

export default withRouter(HeaderContainer)
