import React, { useEffect } from 'react'
import { compose, withApollo, graphql } from 'react-apollo'
import AUTHENTICATE from 'lib/api/auth'

const RefreshToken = (props) => {
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
      },  7000000)
    } catch(e){
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
    <>
      {token()}
    </>
  )
}
export default compose(
  withApollo,
  graphql(AUTHENTICATE.REF_TOKEN, { name: 'refToken'})
)(RefreshToken)
