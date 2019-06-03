import React, { Fragment} from 'react';
import { Modal } from 'antd'
import '../../wallet/wallet_modal/index.scss'

const ModalWrapper = ({ isShowing, hide, walletAddress }) => {
  return(
    <Fragment>
      {isShowing ? (
        <Modal
          title='Top Up Wallet'
          visible={isShowing}
          onCancel={hide}>
          <p>{walletAddress}</p>
        </Modal>
        ) : null
      }
    </Fragment>
  )
}

export default ModalWrapper
