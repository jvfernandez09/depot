import React from 'react'
import { compose, withApollo, Query } from 'react-apollo'
import { Card, Avatar } from 'antd'

import GET_PROFILE from '../../../../../src/graphql/profile'
import '../profile/index.scss'

const ProfileContainer = (props) => {
  return (
    <>
      <div className="body-content">
        <h2 className='title'>User Details</h2>  
        <Card>
          <div className="profile-header">
            <Avatar shape="square" size={150} icon="user" />
            <Query query={GET_PROFILE}>
              {({ data, loading, error }) => {
                if (loading) return <p> Loading </p>
                if (error) return <p>ERROR</p>
                const fullName = `${data.getProfile.data.attributes.firstName} ${data.getProfile.data.attributes.lastName}`
                return(
                  <div className="profile-details">
                    <div className='top'>
                      <div className="name">{fullName} </div>
                      <div className="sub">{data.getProfile.data.attributes.email}</div>
                      <div className="created">{data.getProfile.data.attributes.confirmedAt}</div>
                    </div>
                    <div className='bottom'>
                      <div className='label'>
                        Wallet Address:
                      </div>
                      <div className='item'>
                        {data.getProfile.data.attributes.walletAddress}
                      </div>
                    </div>
                  </div>
                )
              }}
            </Query>
          </div>
        </Card>
      </div>
    </>
  )
}

export default compose(
  withApollo,
)(ProfileContainer)
