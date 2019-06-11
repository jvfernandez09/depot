import React, { Fragment, useState } from 'react';
import { Steps, Modal, Input, Select, Button } from 'antd'
import useModal from 'app/module/wallet/wallet_modal/useModal'
import '../../wallet/wallet_modal/index.scss'

import {ReactComponent as SampleQR} from 'assets/images/sample_qr_code.svg'

const { Option } = Select
const { Step } = Steps

const WalletModal = ({ isShowing, hide, walletAddress }) => {
  const { handleChange, handleChangeSelect, inputs, handleSubmit } = useModal(addFunds)
  const [isShowQr, isSetShowQr] = useState(false)
  const [done, setDone] = useState(false)
  const [current, setCurrent] = useState(0)
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
    const count = current - 1
    isSetShowQr(false)
    setCurrent(count)
  }


  function doneTransaction(){
    isSetShowQr(false)
    setDone(false)
    setCurrent(0)
    hide()
  }

  function addFunds(){
    const variables = { ...inputs, walletAddress}
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
      <div>
        <div>
          <span >Your wallet address {'*'.repeat(walletAddress.length)} </span>
        </div>

        <div>
          <span> Amount: </span>
          <Input
            name='amount'
            type='number'
            onChange={handleChange}
          />
        </div>

        <div>
          <span> Payment Method: </span>
          <Select
            placeholder='Select Payment Method'
            name='type'
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
      <div>
        Your Transaction is Pending
      </div>
    )
  }

  return(
    <Fragment>
      {isShowing ? (
        <Modal
          title='Top Up Wallet'
          visible={isShowing}
          onCancel={hide}
          footer={[current > 0 && (
            <Button key="3" style={{ marginLeft: 8 }} onClick={() => prev()}>
              Previous
            </Button>
            ),
            current < steps.length - 1 && (
              <Button key="1" type="primary" onClick={() => next()}>
                Next
              </Button>
            ),
            current === steps.length - 1 && (
              <Button key="2" type="primary" onClick={() => doneTransaction()}>
                Done
              </Button>
            )
          ]}>

          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-action">
            {current < steps.length - 1 && isShowQr === false ? (
              <div>
                {formInput()}
              </div>
            ) : null }
            {current > 0 && isShowQr ?  (
              <div>
                {generateQR()}
              </div>
            ) : null }
            { current === steps.length - 1 &&  done ? (
              <div>
                {confirmTransaction()}
              </div>
            ) : null}
          </div>
        </Modal>
        ) : null
      }
    </Fragment>
  )
}

export default WalletModal
