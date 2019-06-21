import React from 'react'
import { compose, withApollo, Query } from 'react-apollo'
import { Card, Avatar } from 'antd'

import GET_PROFILE from '../../../../../src/graphql/profile'
import '../profile/index.scss'

const ProfileContainer = (props) => {
  return (
    <>
      <div className="body-container">
        <div className="body-content">
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
                      <div className="title">Name: {fullName} </div>
                      <div>Email: {data.getProfile.data.attributes.email}</div>
                      <div>Confirmed At: {data.getProfile.data.attributes.confirmedAt}</div>
                      <div>Wallet Address: {data.getProfile.data.attributes.walletAddress}</div>
                    </div>
                  )
                }}
              </Query>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

export default compose(
  withApollo,
)(ProfileContainer)
