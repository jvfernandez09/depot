import React, { Fragment} from 'react';
import { Modal, Input, Select } from 'antd'
import useModal from 'app/module/wallet/wallet_modal/useModal'
import '../../wallet/wallet_modal/index.scss'

const { Option } = Select

const ModalWrapper = ({ isShowing, hide, walletAddress }) => {
  const { handleChange, handleChangeSelect, inputs, handleSubmit } = useModal(addFunds)

  function addFunds(){
    //mutation for add wallet funds
    console.log(inputs)
  }
  return(
    <Fragment>
      {isShowing ? (
        <Modal
          title='Top Up Wallet'
          visible={isShowing}
          onCancel={hide}
          onOk={handleSubmit}>
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

export default ModalWrapper
