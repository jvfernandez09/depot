import React,  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { compose, withApollo } from 'react-apollo'
import GET_PROFILE from 'lib/api/profile'
import { Menu, Icon, Avatar, Popover, Dropdown, Modal } from 'antd'
import 'app/header/index.scss'

const Logout = (props) => {
  const [image, setImage] = useState()

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

  const logout = () => {
    Modal.confirm({
      title: 'Logout',
      content: "Are you sure ?",
      onOk() {
        localStorage.clear()
        window.location.replace('/')
      }
    });
  }

  const content = (
    <div>
      <div>
        <Link to="#" onClick={logout}>
          Logout
        </Link>
      </div>
    </div>
  );

  return (
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
  )
}

export default compose(
  withApollo
)(Logout)
