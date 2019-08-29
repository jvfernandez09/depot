import React, { useEffect}  from 'react'
import { compose, graphql, withApollo } from 'react-apollo'

import { Switch } from 'react-router-dom'
import { Layout } from 'antd'
import PrivateRoute from '../../privateRoutes'

import ProfileContainer from 'app/module/profile'
import WalletContainer from 'app/module/wallet'
import ChangePasswordContainer from 'app/module/profile/changePassword'
import AUTHENTICATE from '../../../src/graphql/auth'

import 'app/module/home/index.scss'

const { Content } = Layout;

const ModuleContainer = (props) => {

  useEffect(() => {
    try{
      const { refToken } = props
      const refreshToken = localStorage.getItem('REF_TOKEN')
      const clientCred = {
        input: {
          clientId: process.env.REACT_APP_GWX_CLIENT_ID,
          clientSecret: process.env.REACT_APP_GWX_CLIENT_SECRET,
          grantType: "refresh_token"
        }
      }
      const variables = { ...clientCred.input, refreshToken: refreshToken }
      setInterval(async () => {
        refToken({ variables: { input: variables } }).then(response =>{
          localStorage.setItem('AUTH_TOKEN', response.data.refToken.access_token)
          localStorage.setItem('REF_TOKEN', response.data.refToken.refresh_token)
        }).catch((errors) => {
          console.log(errors)
        })
      },  60000)
    }
    catch(e){
      console.log(e)
    }
  })

  function token(){
    const { refToken } = props
    const refreshToken = localStorage.getItem('REF_TOKEN')
    const clientCred = {
      input: {
        clientId: process.env.REACT_APP_GWX_CLIENT_ID,
        clientSecret: process.env.REACT_APP_GWX_CLIENT_SECRET,
        grantType: "refresh_token"
      }
    }
    const variables = { ...clientCred.input, refreshToken: refreshToken }
    refToken({ variables: { input: variables } }).then(response =>{
      localStorage.setItem('AUTH_TOKEN', response.data.refToken.access_token)
      localStorage.setItem('REF_TOKEN', response.data.refToken.refresh_token)
    }).catch((errors) => {
      console.log(errors)
    })
  }

  return (
    <Content  className='main-body'>
      <Switch>
        {token()}
        <PrivateRoute exac path="/profile" component={ProfileContainer} />
        <PrivateRoute exac path="/change" component={ChangePasswordContainer} />
        <PrivateRoute exac path="/wallet" component={WalletContainer} />
      </Switch>
    </Content>
  )
}
export default compose(
  withApollo,
  graphql(AUTHENTICATE.REF_TOKEN, { name: 'refToken'})
)(ModuleContainer)
