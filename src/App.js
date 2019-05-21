import React, { Component } from 'react';
import './App.css';
import { Layout } from 'antd'
import HeaderContainer from 'app/header/'
import ModuleContainer from 'app/ModuleContainer'
import FooterContainer from 'app/footer/'

class App extends Component {
  render() {
    return (
      <Layout>
        <Layout>
          <HeaderContainer/>
            <ModuleContainer />
          <FooterContainer/>
        </Layout>
      </Layout>
    )
  }
}


export default App;
