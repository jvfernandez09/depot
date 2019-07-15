import React, { Fragment} from 'react';
import { Modal, Input, Select, Button } from 'antd'
import useModal from 'app/module/wallet/wallet_modal/useModal'
import '../../wallet/wallet_modal/index.scss'

const { Option } = Select

const GameWalletModal = ({ isGameShowing, hide, walletAddress }) => {
  const { handleChange, handleChangeSelect, inputs, handleSubmit, isLoading } = useModal(addGameWallet)

  function addGameWallet(){
    const variables = { ...inputs, walletAddress}
    console.log(variables)
    hide()
  }
  return(
    <Fragment>
      {isGameShowing ? (
        <Modal
          title={
            <div className='header-container'>
              <div className='title'>Add GWX Token</div>
            </div>
          }
          onCancel={hide}
          visible={isGameShowing}
          footer={[
            <Button
              key="2"
              type="primary"
              className="button btn-primary -light"
              onClick={hide}>Cancel
            </Button>,
            <Button
              key="1"
              type="primary"
              className="button btn-primary"
              loading={isLoading}
              onClick={handleSubmit}>Add Funds
            </Button>
            ]
          }>

          <div className='form-body'>
            <div className='content'>
              <div className="item">
                <p className='title'>Your wallet address:</p>
                <div className="sub">{walletAddress} </div>
              </div>

              <div className="form-group">
                <label className="form-label"> Amount: </label>
                <Input
                  name='amount'
                  type='number'
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label"> Choose Wallet: </label>
                <Select
                  placeholder='Select Payment Method'
                  name='type'
                  style={{ width: '100%'}}
                  onChange={handleChangeSelect}
                  >
                  <Option value="GWX">GWX Wallet</Option>
                  <Option value="XEM">XEM Wallet</Option>
                </Select>
              </div>
            </div>
          </div>
        </Modal>
        ) : null
      }
    </Fragment>
  )
}

export default GameWalletModal
