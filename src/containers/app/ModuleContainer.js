import React  from 'react'
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import { Layout } from 'antd'
import PrivateRoute from '../../privateRoutes'

import HomeContainer from 'app/module/home'
import ProfileContainer from 'app/module/profile'
import WalletContainer from 'app/module/wallet'
import 'app/module/home/index.scss'

const { Content } = Layout;

const ModuleContainer = () => {
  return (
    <Content  className='main-body'>
      <Router>
        <Switch>
          <PrivateRoute exac path="/home" component={HomeContainer} />
          <PrivateRoute exac path="/profile" component={ProfileContainer} />
          <PrivateRoute exac path="/wallet" component={WalletContainer} />
        </Switch>
      </Router>
    </Content>
  )
}
export default ModuleContainer
