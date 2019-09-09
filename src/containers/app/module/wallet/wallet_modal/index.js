import React, { useState } from 'react';
import { graphql, compose, withApollo, Query } from 'react-apollo'
import { isEmpty, toUpper } from 'lodash'
import { Steps, Modal, Input, Select, Button, Spin } from 'antd'
import useModal from 'app/module/wallet/wallet_modal/useModal'
import '../../wallet/wallet_modal/index.scss'

import QRCode from "qrcode.react";

import TRANSACTIONS from '../../../../../../src/graphql/transaction'

const { Option } = Select
const { Step } = Steps

const WalletModal = ({ createTransaction, userId, isShowing, hide, gwxWalletAddress }) => {
  const { handleChange, handleChangeSelect, inputs, handleSubmit, initialState } = useModal(addFunds)
  const [isShowQr, isSetShowQr] = useState(false)
  const [done, setDone] = useState(false)
  const [qrCode, setQrCode] = useState({})
  const [walletAddress, setWalletAddress] = useState('')
  const [transactionSummary, setTransactionSummary] = useState ({})
  const [current, setCurrent] = useState(0)
  const [gwxToTransfer, setGwxToTransfer] = useState(0)
  const steps = [
    {
      title: 'Top up',
      content: 'Top up',
    },
    {
      title: 'Scan QR',
      content: 'Generate QR',
    },
    {
      title: 'Done',
      content: 'Done',
    },
  ]

  function convert(){
    let value = inputs.quantityToReceive
    let convertTo
    let queryType

    switch(inputs.transactionType){
      case 'btc':
        convertTo = { btc: value }
        queryType = TRANSACTIONS.CONVERT_BTC
        break;
      case 'eth':
        convertTo = { eth: value }
        queryType = TRANSACTIONS.CONVERT_ETH
        break;
      case 'xem':
        convertTo = { xem: value }
        queryType = TRANSACTIONS.CONVERT_XEM
        break;
      default:
        break;
    }

    return(
      <Query query={queryType} variables={ convertTo } fetchPolicy='network-only'>
        {({ data, loading, error }) => {
          if (loading) return <Spin />
          if (error) return <p>ERROR</p>
            const converted = [data]
            let formattedValue = converted[0].convertAmount.gwx.toFixed(8)
            setGwxToTransfer(converted[0].convertAmount.gwx.toString())
            return(
              <>
                <label>You will pay:</label>
                <p className='convert-value'>{formattedValue}</p>
              </>
            )
        }}
      </Query>
    )
  }

  function next() {
    const count = current + 1
      if(count === 1){
        handleSubmit()
      } else {
        confirmTransaction()
        isSetShowQr(false)
        setDone(true)
      }
    setCurrent(count)
  }

  function prev() {
    let count
    if (current === 2){
      count = current - 1
      isSetShowQr(true)
      setCurrent(count)
    } else {
      count = current - 1
      isSetShowQr(false)
      setCurrent(count)
    }
  }

  function doneTransaction(){
    isSetShowQr(false)
    setDone(false)
    setCurrent(0)
    setGwxToTransfer(0)
    hide()
  }

  async function addFunds(){
    const variables = { ...inputs, gwxWalletAddress, userId, gwxToTransfer}

    const parameter = { input: variables }

    createTransaction({ variables: parameter }).then(response => {
      console.log(response)
      initialState()
      isSetShowQr(true)
      if(response.data.createTransaction.data.attributes.transaction_type === 'btc'){
        setQrCode(response.data.createTransaction.data.attributes.top_up_receiving_wallet_address)
        setWalletAddress(response.data.createTransaction.data.attributes.top_up_receiving_wallet_address)
      }
      else if(response.data.createTransaction.data.attributes.transaction_type === 'eth'){
        setQrCode(response.data.createTransaction.data.attributes.top_up_receiving_wallet_address)
        setWalletAddress(response.data.createTransaction.data.attributes.top_up_receiving_wallet_address)
      }
      else {
        setQrCode(JSON.stringify({ data: { addr: toUpper(response.data.createTransaction.data.attributes.top_up_receiving_wallet_address)}}))
        setWalletAddress(response.data.createTransaction.data.attributes.top_up_receiving_wallet_address)
      }

      setTransactionSummary({ data: {
        wallet_address: response.data.createTransaction.data.attributes.top_up_receiving_wallet_address,
        gwx_to_transfer: response.data.createTransaction.data.attributes.gwx_to_transfer,
        quantity_to_receive: response.data.createTransaction.data.attributes.quantity_to_receive,
        status: 'Pending',
        transaction_id: response.data.createTransaction.data.attributes.transaction_id,
        created_at: response.data.createTransaction.data.attributes.created_at
      }})
    }).catch((errors) => {
      console.log(errors)
    })
  }


  function formInput(){
    return (
      <div className='content'>
        <div className="item">
          <p className="title" >Your wallet address:</p>
          <div className='sub'>{gwxWalletAddress}</div>
        </div>

        <div className="form-group">
          <label className="form-label"> Amount: </label>
          <Input
            placeholder="GWX"
            name='quantityToReceive'
            type='number'
            onChange={handleChange}
            className='input'
          />
        </div>

        <div className="form-group">
          <label className="form-label"> Payment Method: </label>
          {process.env.REACT_APP_ENV === 'staging' || process.env.REACT_APP_ENV === 'development' ? (
            <>
            <Select
              placeholder='Select Payment Method'
              name='transactionType'
              style={{ width: '100%'}}
              onChange={handleChangeSelect}
              >
              <Option value="btc">Bitcoin</Option>
              <Option value="xem">XEM</Option>
            </Select>
            </>
          ) : (
            <Select
              placeholder='Select Payment Method'
              name='transactionType'
              style={{ width: '100%'}}
              onChange={handleChangeSelect}
              >
              <Option value="btc">Bitcoin</Option>
              <Option value="xem">XEM</Option>
              <Option value="eth">Etherium</Option>
            </Select>
          )}
        </div>
        <div className='form-group'>
          {!isEmpty(inputs.quantityToReceive) && !isEmpty(inputs.transactionType) ? convert() : null}
        </div>
      </div>
    )
  }

  function confirmTransaction(){
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
              quantity to receive
            </p>
            <div className='sub'>
              {transactionSummary.data.gwx_to_transfer}
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


  return(
    <>
      {isShowing ? (
        <Modal
          title={
            <div className='header-container'>
              <div className='title'>Buy GWX</div>
              <Steps current={current}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
            </div>
          }
          visible={isShowing}
          onCancel={hide}
          footer={[current > 0 && (
            <Button className="button btn-primary -light" key="3" style={{ marginLeft: 8 }} onClick={() => prev()}>
              Previous
            </Button>
            ),
            current < steps.length - 1 && (
              <Button className="button btn-primary" key="1" type="primary" onClick={() => next()}>
                Next
              </Button>
            ),
            current === steps.length - 1 && (
              <Button className="button btn-primary" key="2" type="primary"  onClick={() => doneTransaction()}>
                Done
              </Button>
            )
          ]}>

          <div className="steps-action">
            {current < steps.length - 1 && isShowQr === false ? (
              <div className="form-body">
                {formInput()}
              </div>
            ) : null }
            {current > 0 && isShowQr ?  (
              <div className="form-body">
                <div className="qr-code">{
                  qrCode ? (
                    <>
                      <div>
                        <QRCode
                          size={220}
                          value={`${qrCode}`}
                        />
                        <div>
                          <label>WALLET ADDRESS:</label>
                          <p className='convert-value'>{walletAddress}</p>
                        </div>
                      </div>
                    </>
                  ) : null
                }</div>
              </div>
            ) : null }
            { current === steps.length - 1 &&  done ? (
              <div className="form-body">
                {confirmTransaction()}
              </div>
            ) : null}
          </div>
        </Modal>
        ) : null
      }


    </>
  )
}

export default compose(
  withApollo,
  graphql(TRANSACTIONS.CREATE_TRANSACTION, { name: 'createTransaction' })
)(WalletModal)
