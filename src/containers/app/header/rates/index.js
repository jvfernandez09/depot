import React,  { useEffect, useState } from 'react'
import { compose, withApollo } from 'react-apollo'

import REAL_TIME_RATES from 'lib/api/realTimeRates'

const Rate = (props) => {
  const [btc, setBtc] = useState(0)
  const [eth, setEth] = useState(0)
  const [xem, setXem] = useState(0)

  useEffect(() => {
    try{
      setInterval(async () => {
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
      let btc_rate = (0.0031 / parseFloat(result.data.rates.data.attributes.btc_rate)) * 1.05
      let eth_rate = (0.0031 / parseFloat(result.data.rates.data.attributes.eth_rate)) * 1.05
      let xem_rate = (0.0031 / parseFloat(result.data.rates.data.attributes.xem_rate)) * 1.05

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
        <span className='rates'>
          BUY 1 GWX: 0.0031 USD
          <span className='rate-dot'>•</span>
        </span>
        <span className='rates'>
          {btc}  BTC
          <span className='rate-dot'>•</span>
        </span>
        <span className='rates'>
          {eth}  ETH
          <span className='rate-dot'>•</span>
        </span>
        <span className='rates'>
          {xem}  XEM
        </span>
    </>
  )
}

export default compose(
  withApollo
)(Rate)
