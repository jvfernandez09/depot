import React from 'react';
import './App.css';
import { Layout } from 'antd'
import {BrowserRouter as Router, Switch} from 'react-router-dom';

import HeaderContainer from 'app/header/'
import ModuleContainer from 'app/ModuleContainer'

const App = (props) => {
  return (
    <Router>
      <Switch>
        <>
          <Layout>
            <HeaderContainer history={props.history}/>
              <ModuleContainer />
            {/*<FooterContainer/>*/}
          </Layout>
        </>
      </Switch>
    </Router>
  )
}


export default App;
