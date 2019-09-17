import React, { useState } from 'react';
import { graphql, compose, withApollo, Query } from 'react-apollo'
import { isEmpty, toUpper } from 'lodash'
import { Steps, Modal, Input, Select, Button, Spin, Icon } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import useModal from 'app/module/wallet/wallet_modal/useModal'
import '../../wallet/wallet_modal/index.scss'
import ConfirmTransaction from './confirmTransaction'
import QRCode from "qrcode.react"
import Notification from 'utils/notification'

import TRANSACTIONS from '../../../../../../src/graphql/transaction'

const { Option } = Select
const { Step } = Steps
const { confirm } = Modal

const WalletModal = ({ createTransaction, userId, isShowing, hide, gwxWalletAddress }) => {
  const {
    handleChange,
    handleChangeSelect,
    inputs,
    handleSubmit,
    initialState,
  } = useModal(addFunds)

  const [isShowQr, isSetShowQr] = useState(false)
  const [done, setDone] = useState(false)
  const [qrCode, setQrCode] = useState({})
  const [walletAddress, setWalletAddress] = useState('')
  const [transactionSummary, setTransactionSummary] = useState ({})
  const [current, setCurrent] = useState(0)
  const [gwxToTransfer, setGwxToTransfer] = useState(0)
  const [pay, setPay] = useState(0)

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
            let computedValue = converted[0].convertAmount.gwx * 0.02
            computedValue = computedValue + converted[0].convertAmount.gwx

            let formattedValue = inputs.transactionType === "xem" ? computedValue.toFixed(6) :
            computedValue.toFixed(8)

            setPay(formattedValue)
            setGwxToTransfer(formattedValue.toString())

            const convertedValue = formattedValue+' '+toUpper(inputs.transactionType)
              return(
              <>
                <label>You will pay:</label>
                <p className='convert-value'>{convertedValue}</p>
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
        confirmTransaction(inputs.transactionType)
        isSetShowQr(false)
        setDone(true)
      }
    setCurrent(count)
  }

  function doneTransaction(){
    isSetShowQr(false)
    setDone(false)
    setCurrent(0)
    initialState()
    setGwxToTransfer(0)
    hide()
  }

  function showConfirm() {
    confirm({
      style: { marginTop: '180px' },
      title: 'Do you want to proceed?',
      content: 'NOTE: Please review transaction details. Click OK to continue.',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          next()
        }).catch(() => console.log('Something went wrong'));
      },
      onCancel() {
        isSetShowQr(false)
      },
    })
  }

  async function addFunds(){
    const variables = { ...inputs, gwxWalletAddress, userId, gwxToTransfer}

    const parameter = { input: variables }

    createTransaction({ variables: parameter }).then(async response => {
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
            placeholder="Input GWX"
            name='quantityToReceive'
            type="number"
            onChange={handleChange}
            className='input'
          />
          {inputs.quantityToReceive > 500000 ?
            <>
            <p style={{ color: 'red'}}>Maximum GWX Purchase is 500,000</p>
            </>
          : null}
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
              <Option value="eth">Ethereum</Option>
            </Select>
          )}
        </div>
        <div className='form-group'>
          {!isEmpty(inputs.quantityToReceive) && !isEmpty(inputs.transactionType) ? convert() : null}
        </div>
      </div>
    )
  }

  function confirmTransaction(type){
    return(
      <ConfirmTransaction
        transactionSummary={transactionSummary}
        type={type}
      />
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
          onCancel={()=> {
            hide()
            initialState()
            setCurrent(0)
            isSetShowQr(false)
          }}
          footer={[current < steps.length - 1 && (
              <Button
                className="button btn-primary"
                key="1"
                type="primary"
                disabled={!isEmpty(inputs.quantityToReceive) && !isEmpty(inputs.transactionType) && inputs.quantityToReceive <= 500000 ? false : true}
                onClick={() => current === 0 ? showConfirm() : next()}
              >
                Next
              </Button>
            ),
            current === steps.length - 1 && (
              <Button
                className="button btn-primary"
                key="2" type="primary"
                onClick={() =>  doneTransaction() }
              >
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
                          <label>You will pay: </label>
                          <p className="convert-value">{pay+' '+toUpper(inputs.transactionType)}</p>
                        </div>
                        <div>
                          <label>WALLET ADDRESS:</label>
                          <p className="convert-value">{walletAddress}
                            <CopyToClipboard
                              onCopy={(e) => {
                                Notification.show({
                                  type: 'success',
                                  message: 'Wallet address copied.'
                                })
                              }}
                              text={walletAddress}>
                              <Icon
                                type="copy"
                                theme="twoTone"
                                style={{ marginLeft: '4px'}}
                              />
                            </CopyToClipboard>
                          </p>
                        </div>
                      </div>
                    </>
                  ) : null
                }</div>
              </div>
            ) : null }

            { current === steps.length - 1 &&  done ? (
              <div className="form-body">
                {confirmTransaction(inputs.transactionType)}
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
