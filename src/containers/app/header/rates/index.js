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
      let btc_rate = btc * 0.02
      btc_rate = btc_rate + btc
      let eth = 0.019 / parseFloat(result.data.rates.data.attributes.eth_rate)
      let eth_rate = eth * 0.02
      eth_rate = eth_rate + eth
      let xem = 0.019 / parseFloat(result.data.rates.data.attributes.xem_rate)
      let xem_rate = xem * 0.02
      xem_rate = xem_rate + xem
      
      setBtc(btc_rate.toFixed(8))
      setEth(eth_rate.toFixed(8))
      setXem(xem_rate.toFixed(6))
    }).catch((e) => {
      console.log(e)
    })
  }

  return (
    <>
      {getConversion()}
      <span style={{ color: '#F8D154'}}> BUY 1 GWX: 0.019 USD<span style={{ marginLeft: '8px', marginRight: '8px' }}>•</span></span>
      <span style={{ color: '#F8D154'}}> {btc}  BTC <span style={{ marginLeft: '8px', marginRight: '8px' }}>•</span></span>
      <span style={{ color: '#F8D154'}}> {eth}  ETH <span style={{ marginLeft: '8px', marginRight: '8px' }}>•</span></span>
      <span style={{ color: '#F8D154'}}> {xem}  XEM </span>
    </>
  )
}

export default compose(
  withApollo
)(Rate)
