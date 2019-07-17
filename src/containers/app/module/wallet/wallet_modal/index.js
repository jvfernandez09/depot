import React, { useState } from 'react';
import { compose, graphql, withApollo, Query } from 'react-apollo'

import { Steps, Modal, Input, Select, Button } from 'antd'
import useModal from 'app/module/wallet/wallet_modal/useModal'
import '../../wallet/wallet_modal/index.scss'

import {ReactComponent as SampleQR} from 'assets/images/sample_qr_code.svg'

import TRANSACTIONS from '../../../../../../src/graphql/transaction'

const { Option } = Select
const { Step } = Steps

const WalletModal = ({ props, userId, isShowing, hide, walletAddress }) => {
  const { handleChange, handleChangeSelect, inputs, handleSubmit } = useModal(addFunds)
  const [isShowQr, isSetShowQr] = useState(false)
  const [done, setDone] = useState(false)
  const [current, setCurrent] = useState(0)
  console.log(props)
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
    hide()
  }

  function addFunds(){
    const variables = { ...inputs, walletAddress, userId}
    console.log(variables)
    isSetShowQr(true)
    generateQR(variables)
  }

  function generateQR(response){
    return (
      <div>
       <SampleQR />
      </div>
    )
  }

  function formInput(){
    return (
      <div className='content'>
        <div className="item">
          <p className="title" >Your wallet address:</p>
          <div className='sub'>{walletAddress}</div>
        </div>

        <div className="form-group">
          <label className="form-label"> Amount: </label>
          <Input
            name='quantity'
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
            <Option value="BTC">Bitcoin</Option>
            <Option value="XEM">XEM</Option>
            <Option value="Etherium">Etherium</Option>
        </Select>
        </div>
      </div>
    )
  }


  function confirmTransaction(){
    return(
      <div className='end'>
        Done! Your transaction is pending.
      </div>
    )
  }


  function transaction(userId){
    return(
      <Query query={TRANSACTIONS.ALL_TRANSACTIONS} variables={{ userId }} fetchPolicy='network-only'>
      {({ data, loading, error }) => {
        if (loading) return <p> test </p>
        if (error) return <p>ERROR</p>
        return(
          <>
            <p>test</p>
          </>
        )
      }}
      </Query>
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
              <Button className="button btn-primary" key="2" type="primary" onClick={() => doneTransaction()}>
                Done
              </Button>
            )
          ]}>

          <div className="steps-action">
            {userId && transaction(userId)}
            {current < steps.length - 1 && isShowQr === false ? (
              <div className="form-body">
                {formInput()}
              </div>
            ) : null }
            {current > 0 && isShowQr ?  (
              <div className="form-body">
                <div className="qr-code">{generateQR()}</div>
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
