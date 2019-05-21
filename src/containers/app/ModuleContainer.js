import React, { Component } from 'react'
import { Layout } from 'antd'
import HomeContainer from 'app/module/home'

const { Content } = Layout;

export default class ModuleContainer extends Component {
  render(){
    return(
      <Content  style={{width: '100%', padding: '20px',backgroundColor: 'blue'}}>
        <HomeContainer/>
      </Content>
    )
  }
}
