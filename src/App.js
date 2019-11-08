import React from 'react';
import { Layout } from 'antd'
import {BrowserRouter as Router, Switch} from 'react-router-dom';

import HeaderContainer from 'app/header/'
import ModuleContainer from 'app/ModuleContainer'

const App = () => {
  return (
    <Router>
      <Switch>
        <>
          <Layout>
            <HeaderContainer />
              <ModuleContainer />
          </Layout>
        </>
      </Switch>
    </Router>
  )
}


export default App
