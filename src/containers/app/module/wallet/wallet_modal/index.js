import React, { Fragment} from 'react';
import { Modal, Input, Select, Button } from 'antd'
import useModal from 'app/module/wallet/wallet_modal/useModal'
import '../../wallet/wallet_modal/index.scss'

const { Option } = Select

const WalletModal = ({ isShowing, hide, walletAddress }) => {
  const { handleChange, handleChangeSelect, inputs, handleSubmit, isLoading } = useModal(addFunds)

  function addFunds(){
    console.log(inputs)
    hide()
  }
  return(
    <Fragment>
      {isShowing ? (
        <Modal
          title='Top Up Wallet'
          visible={isShowing}
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
          <Input
            name='amount'
            onChange={handleChange}
          />
          <Select
            placeholder='Select Payment Method'
            name='type'
            style={{ width: '100%'}}
            onChange={handleChangeSelect}
            >
            <Option value="BTC">Bitcoin</Option>
            <Option value="Etherium">Etherium</Option>
          </Select>
        </Modal>
        ) : null
      }
    </Fragment>
  )
}

export default WalletModal
