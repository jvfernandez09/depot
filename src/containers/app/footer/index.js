import React, { Component } from 'react'
import { Layout } from 'antd'

const { Footer } = Layout;


export default class FooterContainer extends Component {
  render(){
    return(
      <Footer style={{width: '100%', padding: '20px',backgroundColor: 'yellow'}}>
        Footer MAN
      </Footer>
    )
  }
}
