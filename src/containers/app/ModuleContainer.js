import React from 'react'
import { Switch } from 'react-router-dom'
import { Layout } from 'antd'
import PrivateRoute from '../../privateRoutes'

import ProfileContainer from 'app/module/profile'
import WalletContainer from 'app/module/wallet'
import ChangePasswordContainer from 'app/module/profile/changePassword'

import 'app/module/home/index.scss'

const { Content } = Layout;

const ModuleContainer = () => {
  return (
    <Content  className='main-body'>
      <Switch>
        <PrivateRoute exac path="/profile" component={ProfileContainer} />
        <PrivateRoute exac path="/change" component={ChangePasswordContainer} />
        <PrivateRoute exac path="/" component={WalletContainer} />
      </Switch>
    </Content>
  )
}
export default ModuleContainer
