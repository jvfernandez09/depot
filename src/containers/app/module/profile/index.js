import React from 'react'
import { compose, graphql, withApollo, Query } from 'react-apollo'

import GET_PROFILE from '../../../../../src/graphql/profile'


const ProfileContainer = (props) => {
  return (
    <div>
      <Query query={GET_PROFILE}>
        {({ data, loading, error }) => {
          if (loading) return <p> Loading </p>
          if (error) return <p>ERROR</p>
          console.log(data.getProfile.data)
          return(
            <div>
              <div>First Name: {data.getProfile.data.attributes.firstName}</div>
              <div>Last Name: {data.getProfile.data.attributes.lastName}</div>
              <div>Email: {data.getProfile.data.attributes.email}</div>
              <div>Confirmed At: {data.getProfile.data.attributes.confirmedAt}</div>
              <div>Confirmed Sent At: {data.getProfile.data.attributes.confirmedSentAt}</div>
              <div>Wallet Address: {data.getProfile.data.attributes.walletAddress}</div>

            </div>
          )
        }}
      </Query>
    </div>
  )
}

export default compose(
  withApollo,
  graphql(GET_PROFILE, { name: 'getProfile' })
)(ProfileContainer)
