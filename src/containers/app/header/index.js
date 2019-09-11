import React, {useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import { Layout } from 'antd'
import 'app/header/index.scss'
import { ReactComponent as Logo } from 'assets/images/LOGO-tokendepot.svg'
import Rate from 'app/header/rates'
import { Menu, Dropdown, Icon, Button } from 'antd'

const { Header } = Layout;

const HeaderContainer = (props) => {

  useEffect(() => {
    if (props.history.location.pathname === '/') {
       props.history.push('/profile')
    }
  })

  function logout(){
    localStorage.clear()
    window.location.replace('/')
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
          <Rate />
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

export default withRouter(HeaderContainer)
