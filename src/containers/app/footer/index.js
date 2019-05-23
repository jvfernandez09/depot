import React, { Component } from 'react'
import { Layout } from 'antd'
import { version } from 'package'
import 'app/footer/index.scss'

const { Footer } = Layout;


export default class FooterContainer extends Component {
  render(){
    return(
      <Footer className='main-footer'>
        {version}
      </Footer>
    )
  }
}
