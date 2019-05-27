import React, { Component } from 'react'
import { compose, graphql, withApollo, Query } from 'react-apollo'

import WALLETS from '../../../../../src/graphql/wallet'

class WalletContainer extends Component{


  //
  // const fetchWallet =  async () => {
  //   try{
  //     client.query({
  //
  //     })
  //   } catch(e){
  //     console.log(e)
  //   }
  // }

  render(){
    return (
      <h1>
        wallets
      </h1>
    )
  }

}

export default compose(
  withApollo
)(WalletContainer)
