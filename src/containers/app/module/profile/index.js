import React from 'react'
import { compose, withApollo, Query } from 'react-apollo'
import { Spin, Tabs, Icon, Card, Avatar } from 'antd'

import GET_PROFILE from '../../../../../src/graphql/profile'
import '../profile/index.scss'

import WalletContainer from 'app/module/wallet'
import TransactionContainer from 'app/module/transaction'

const { TabPane } = Tabs

const ProfileContainer = (props) => {
  return (
    <>
      <div>
        <Query query={GET_PROFILE}>
          {({ data, loading, error }) => {
            if (loading) return <Spin />
            if (error) return <p>ERROR</p>
            const firstName = data.getProfile.data.attributes.firstName
            const lastName = data.getProfile.data.attributes.lastName.slice(-1) === 's' ?
              data.getProfile.data.attributes.lastName : data.getProfile.data.attributes.lastName+"'s"
            return (
              <>
                <h1 className='header'>{firstName+' '+lastName} PERSONAL WALLET</h1>
              </>
            )
            }}
        </Query>
      </div>
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
      <div className="body-content">
          <Card>
            <Query query={GET_PROFILE}>
              {({ data, loading, error }) => {
                if (loading) return <Spin />
                if (error) return <p>ERROR</p>
                const userId = data.getProfile.data.id
                return (
                  <Tabs  defaultActiveKey="1" tabPosition='top'>
                    <TabPane tab={<span><Icon type='wallet' />My Wallets</span>} key='1'>
                      <WalletContainer />
                    </TabPane>
                    <TabPane tab={<span><Icon type='table' />Transaction History</span>} key='2'>
                      <TransactionContainer
                        userId={userId}
                      />
                    </TabPane>
                  </Tabs>
                )
              }}
            </Query>
          </Card>
      </div>
    </>
  )
}

export default compose(
  withApollo,
)(ProfileContainer)
