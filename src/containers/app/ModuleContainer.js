import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd'

import HomeContainer from 'app/module/home'
import ProfileContainer from 'app/module/profile'
import WalletContainer from 'app/module/wallet'
import 'app/module/home/index.scss'

const { Content } = Layout;

const ModuleContainer = () => {
  return (
    <Content  className='main-body'>
      <Switch>
        <Route path="/home" component={HomeContainer} />
        <Route path="/profile" component={ProfileContainer} />
        <Route path="/wallet" component={WalletContainer} />
        <Route path="/" component={HomeContainer} />
      </Switch>
    </Content>
  )
}
export default ModuleContainer
