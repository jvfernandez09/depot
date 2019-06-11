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
          title='Add GWX Token'
          onCancel={hide}
          visible={isGameShowing}
          footer={[
            <Button
              key="2"
              type="primary"
              onClick={hide}>Cancel
            </Button>,
            <Button
              key="1"
              type="primary"
              loading={isLoading}
              onClick={handleSubmit}>Add Funds
            </Button>
            ]
          }>

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
            <span> Choose Wallet: </span>
            <Select
              placeholder='Select Payment Method'
              name='type'
              style={{ width: '100%'}}
              onChange={handleChangeSelect}
              >
              <Option value="BTC">Bitcoin Wallet</Option>
              <Option value="XEM">XEM Wallet</Option>
              <Option value="Etherium">Etherium Wallet</Option>
          </Select>
          </div>
        </Modal>
        ) : null
      }
    </Fragment>
  )
}

export default GameWalletModal
