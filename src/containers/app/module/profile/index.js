import React, { useState } from 'react'
import { compose, withApollo, Query } from 'react-apollo'
import { Spin, Tabs, Icon, Card, Avatar } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import dayjs from 'dayjs'

import GET_PROFILE from '../../../../../src/graphql/profile'
import '../profile/index.scss'

import WalletContainer from 'app/module/wallet'
import TransactionContainer from 'app/module/transaction'
import Notification from 'utils/notification'

const { TabPane } = Tabs

const ProfileContainer = (props) => {
  const [tab, setTab] = useState()
  return (
    <>
      <div className="profile-container">
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
        <div className="body-content">
          <h2 className='title'>User Details</h2>
          <Card>
            <div className="profile-header">
              <Avatar shape="square" size={150} icon="user" />
              <Query query={GET_PROFILE}>
                {({ data, loading, error }) => {
                  if (loading) return <p> Loading </p>
                  if (error) return <p>ERROR</p>
                  const response = data.getProfile.data.attributes
                  const fullName = `${response.firstName} ${response.lastName}`
                  return(
                    <div className="profile-details">
                      <div className='top'>
                        <div className="name">{fullName} </div>
                        <div className="sub">{response.email}</div>
                        <div className="created">Last logged in: {dayjs(response.lastLogin).format('DD-MMM-YYYY,  HH:mm')}</div>
                      </div>
                      <div className='bottom'>
                        <div className='label'>
                          Wallet Address:
                        </div>
                        <div className='item'>
                          {response.walletAddress}
                          <CopyToClipboard
                            onCopy={(e) => {
                              Notification.show({
                                type: 'success',
                                message: 'Wallet address copied.'
                              })
                            }}
                            text={response.walletAddress}>
                              <Icon
                                type="copy"
                                theme="twoTone"
                                style={{ marginLeft: '4px'}}
                              />
                            </CopyToClipboard>
                        </div>
                      </div>
                    </div>
                  )
                }}
              </Query>
            </div>
          </Card>
        </div>
      </div>
      <div className="tab-content">
        <div className="body-content">
            <div>
              <Query query={GET_PROFILE}>
                {({ data, loading, error }) => {
                  if (loading) return <Spin />
                  if (error) return <p>ERROR</p>
                  const userId = data.getProfile.data.id
                  return (
                    <Tabs
                      onTabClick={(e) => setTab(e)}
                      defaultActiveKey="1"
                      tabPosition='top'
                    >
                      <TabPane
                        tab={<span><Icon type='wallet' />My Wallets</span>}
                        key='1'
                      >
                        <WalletContainer />
                      </TabPane>
                      <TabPane
                        tab={<span><Icon type='table' />Transaction History</span>}
                        key='2'
                      >
                        <TransactionContainer
                          userId={userId}
                          tab={tab}
                        />
                      </TabPane>
                    </Tabs>
                  )
                }}
              </Query>
            </div>
        </div>
      </div>
    </>
  )
}

export default compose(
  withApollo,
)(ProfileContainer)
