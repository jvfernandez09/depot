import React, {Fragment} from 'react';
import './App.css';
import { Layout } from 'antd'
import {BrowserRouter as Router, Switch} from 'react-router-dom';

import HeaderContainer from 'app/header/'
import ModuleContainer from 'app/ModuleContainer'
import FooterContainer from 'app/footer/'

const App = () => {
  return (
    <Router>
      <Switch>
        <Fragment>
          <Layout>
            <HeaderContainer/>
              <ModuleContainer />
            <FooterContainer/>
          </Layout>
        </Fragment>
      </Switch>
    </Router>
  )
}


export default App;
