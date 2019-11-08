import React,  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { compose, withApollo } from 'react-apollo'
import GET_PROFILE from 'lib/api/profile'
import { Avatar, Popover, Modal, Icon, Button } from 'antd'
import 'app/header/index.scss'

const Logout = (props) => {
  const [image, setImage] = useState()
  const [open, isOpen] = useState(false)

  useEffect(() => {
    const { client } = props
    client.query({
      query: GET_PROFILE
    }).then((result) => {
      setImage(result.data.getProfile.data.attributes.avatar.url)
    }).catch((e) => {
      console.log(e)
    })
  })

  const content = (
    <div>
      <div>
        <Link to="#" onClick={() => {
          isOpen(!open)
        }}>
          Log out
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <Popover
        placement="bottomRight"
        content={content}
      >
        <Avatar
          style={{ marginLeft: 17 }}
          src={image}
          size={40}
       />
      </Popover>

      { open ? (
        <Modal
          className='confirm-modal'
          visible={open}
          closable={null}
          bodyStyle={{
            padding: '32px 32px 24px',
            backgroundColor: '#15254a'
          }}
          footer={null}
          >
          <div className="modal-container">
            <div className="title-container">
              <Icon
                className="icon-circle"
                type="question-circle"
                style={{ fontSize: '22px', color: '#F8D154'}}
               />
               <div className="title-logout"> Log out </div>
             </div>

            <div className="content-container">
              Are you sure you want to Log out?
            </div>

            <div className='button-container'>
              <Button
                className="button-cancel"
                key="2"
                type="primary"
                onClick={() => isOpen(!open)}
              >
                Cancel
              </Button>,
              <Button
                className="button-ok"
                key="1"
                type="primary"
                onClick={() => {
                  localStorage.clear()
                  window.location.replace('/')
                }}
              >
                OK
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  )
}

export default compose(
  withApollo
)(Logout)
