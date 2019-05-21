import React, { Component} from 'react'
import { Layout } from 'antd';

const { Header } = Layout;

export default class HeaderContainer extends Component {
  render(){
    return (
      <Header style={{width: '100%', padding: '20px',backgroundColor: 'red'}}>Header</Header>
    )
  }
}
