import React,  { useEffect, useState } from 'react'
import { compose, withApollo } from 'react-apollo'

import REAL_TIME_RATES from '../../../../../src/graphql/realTimeRates'

const Rate = (props) => {
  const [btc, setBtc] = useState(0)
  const [eth, setEth] = useState(0)
  const [xem, setXem] = useState(0)

  useEffect(() => {
    try{
      setInterval(async ()=> {
        getConversion()
      },  600000)
    } catch(e){
      console.log(e)
    }
  })

  function getConversion(){
    const { client } = props
    client.query({
      query: REAL_TIME_RATES
    }).then((result) => {
      let btc = 0.019 / parseFloat(result.data.rates.data.attributes.btc_rate)
      let eth = 0.019 / parseFloat(result.data.rates.data.attributes.btc_rate)
      let xem = 0.019 / parseFloat(result.data.rates.data.attributes.btc_rate)
      setBtc(btc.toFixed(8))
      setEth(eth.toFixed(8))
      setXem(xem.toFixed(6))
    }).catch((e) => {
      console.log(e)
    })
  }

  return (
    <>
      {getConversion()}
      <span style={{ color: '#F8D154'}}> BUY 1 GWX: 0.019 USD | </span>
      <span style={{ color: '#F8D154'}}> {btc} BTC |</span>
      <span style={{ color: '#F8D154'}}> {eth} ETH |</span>
      <span style={{ color: '#F8D154'}}> {xem} XEM </span>
    </>
  )
}

export default compose(
  withApollo
)(Rate)
