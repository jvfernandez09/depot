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
  const [transactionSummary, setTransactionSummary] = useState ({})
  const [current, setCurrent] = useState(0)
  const [gwxToTransfer, setGwxToTransfer] = useState(0)

  const steps = [
    {
      title: 'Top up',
      content: 'Top up',
    },
    {
      title: 'Generate QR',
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
            setGwxToTransfer(converted[0].convertAmount.gwx.toString())
            return(
              <>
                <div className="form-group">
                <label className="form-label"> Conversion: {gwxToTransfer} </label>
                </div>
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
      initialState()
      isSetShowQr(true)
      if (response.data.createTransaction.data.attributes.transaction_type === 'btc' || response.data.createTransaction.data.attributes.transactionType === 'eth'){
        setQrCode(response.data.createTransaction.data.attributes.top_up_receiving_wallet_address)
      } else {
        setQrCode(JSON.stringify({ data: { addr: toUpper(response.data.createTransaction.data.attributes.top_up_receiving_wallet_address)}}))
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
            name='quantityToReceive'
            type='number'
            onChange={handleChange}
            className='input'
          />
        </div>

        <div className="form-group">
          <label className="form-label"> Payment Method: </label>
          <Select
            placeholder='Select Payment Method'
            name='transactionType'
            style={{ width: '100%'}}
            onChange={handleChangeSelect}
            >
            <Option value="btc">Bitcoin</Option>
            <Option value="xem">XEM</Option>
        </Select>
        </div>


          {!isEmpty(inputs.quantityToReceive) && !isEmpty(inputs.transactionType) ? convert() : null}
      </div>
    )
  }

  function confirmTransaction(){
    return(
      <div className='end'>
        <ul>
          <label>Transaction Summary</label>
          <li>Transaction #: <span>{transactionSummary.data.transaction_id}</span></li>
          <li>Transaction Date: <span>{transactionSummary.data.created_at}</span></li>
          <li>Receiving Wallet Address: <span>{transactionSummary.data.wallet_address}</span></li>
          <li>GWX to Transfer: <span>{transactionSummary.data.gwx_to_transfer}</span></li>
          <li>Quantity to Receive: <span>{transactionSummary.data.quantity_to_receive}</span></li>
          <li>Status: <span>Pending</span></li>
        </ul>
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
                      <div style={{ backgroundColor: 'white', padding: 8 }}>
                        <QRCode
                          size={220}
                          value={`${qrCode}`}
                        />
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
