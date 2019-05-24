import React, { Component } from 'react'
import { Layout } from 'antd'
import HomeContainer from 'app/module/home'
import ReactHook  from 'utils/'
import 'app/module/home/index.scss'
const { Content } = Layout;

export default class ModuleContainer extends Component {
  render(){
    return(
      <Content  className='main-body'>
        <HomeContainer />
        <ProfileContainer />
      </Content>
    )
  }
}
