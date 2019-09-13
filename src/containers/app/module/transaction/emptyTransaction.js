import React from 'react'
import { Card, Button } from 'antd'
import './index.scss'

const EmptyTransaction = () => {
  return(
    <div className="body-content">
      <h2 className='title -pad'>Transaction History</h2>
      <Card>
        <div className="wallet-container">
          <p className='top'></p>
          <div className='balance'>
            <span>You don't have any Transactions.</span>
          </div>
          <Button style={{ background: 'transparent', border: 'none' }}></Button>
        </div>
      </Card>
    </div>
  )
}

export default EmptyTransaction
