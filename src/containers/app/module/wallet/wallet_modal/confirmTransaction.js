import React from 'react'
import '../../wallet/wallet_modal/index.scss'
import { toUpper } from 'lodash'


const ConfirmTransaction = ({ transactionSummary, type }) => {
  const transactionType = toUpper(type)
  const amountToPay = transactionType === 'XEM' ? parseFloat(transactionSummary.data.gwx_to_transfer).toFixed(6)
  : parseFloat(transactionSummary.data.gwx_to_transfer).toFixed(8)
  
  return(
    <div className='content'>
      <div className='flex'>
        <div className='item'>
          <p className='title'>
            transaction number
          </p>
          <div className='sub'>
            {transactionSummary.data.transaction_id}
          </div>
        </div>
        <div className='item'>
          <p className='title'>
            status
          </p>
          <div className='sub'>
            Pending
          </div>
        </div>
      </div>
      <div className='flex'>
        <div className='item'>
          <p className='title'>
            gwx to transfer
          </p>
          <div className='sub'>
            {transactionSummary.data.quantity_to_receive}
          </div>
        </div>
        <div className='item'>
          <p className='title'>
            amount to pay
          </p>
          <div className='sub'>
            {amountToPay+' '+transactionType}
          </div>
        </div>
      </div>
      <div className='item'>
        <p className='title'>
          receiving wallet address
        </p>
        <div className='sub'>
          {transactionSummary.data.wallet_address}
        </div>
      </div>
      <div className='item'>
        <div className='sub-text'>
          Make sure you allocate enough fuel otherwise transaction confirmation may reach up to 24 hours.
        </div>
      </div>
    </div>
  )
}


export default ConfirmTransaction
