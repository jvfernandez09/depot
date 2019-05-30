import React, { Component } from 'react'
import { Layout, Menu } from 'antd'

const { Sider } = Layout;

class Sidebar extends Component {
  state = {
    collapse: false
  }

  toggle () {
    this.setState({
      collapse: !this.state.collapse
    })
  }

  render () {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapse}>
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} >
            <Menu.Item key='1'>
              <span>My Wallet</span>
            </Menu.Item>
            <Menu.Item key='2'>
              <span>Transaction History</span>
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    )
  }
}
export default Sidebar
