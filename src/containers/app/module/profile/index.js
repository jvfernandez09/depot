import React, { useState } from 'react'
import { compose, withApollo, Query } from 'react-apollo'
import { Spin, Tabs, Icon, Card, Avatar } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import dayjs from 'dayjs'

import GET_PROFILE from 'lib/api/profile'
import '../profile/index.scss'


import strings from 'utils/strings'
import WalletContainer from 'app/module/wallet'
import TransactionContainer from 'app/module/transaction'
import Notification from 'utils/notification'
import helpers from 'utils/helpers'

const { TabPane } = Tabs

const ProfileContainer = (props) => {
  const [tab, setTab] = useState()

  return (
    <Query query={GET_PROFILE}>
      {({ data, loading, error }) => {
        if (loading) return <Spin />
        if (error) return <p>ERROR</p>

        const firstName = data.getProfile.data.attributes.firstName
        const lastName = data.getProfile.data.attributes.lastName.slice(-1) === 's'
          ? data.getProfile.data.attributes.lastName
          : data.getProfile.data.attributes.lastName+"'s"
        const response = data.getProfile.data.attributes
        const userId = data.getProfile.data.id

        return (
          <>
            <div className="profile-container">
              <h1 className='header'>{firstName+' '+lastName} {strings.personal_wallet}</h1>
              <div className="body-content">
                <h2 className='title'>{strings.user_details}</h2>
                <Card>
                  <div className="profile-header">
                    <div className='profile-pic'>
                    {response.avatar.url === null
                      ? <Avatar style={{background: 'white' }}shape="square" size={128}>
                        <span style={{ fontSize: 45, color: 'gray' }}>{helpers.getInitials(firstName)}</span>
                        </Avatar>
                      : <img
                          style={{ objectFit: 'cover', width:'128px', height:'128px' }}
                          src={response.avatar.url}
                          alt=""
                        />
                    }
                    </div>
                    <div className="profile-details">
                      <div className='top'>
                        <div className="name">{`${response.firstName} ${response.lastName}`} </div>
                        <div className="sub">{response.email}</div>
                        <div className="created">Last logged in: {dayjs(response.lastLogin).format('DD-MMM-YYYY,  HH:mm')}</div>
                      </div>
                      <div className='bottom'>
                        <div className='label'>
                          {strings.wallet_address}
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
                  </div>
                </Card>
              </div>
            </div>

            <div className="tab-content">
              <div className="body-content">
                <Tabs
                  onTabClick={(e) => setTab(e)}
                  defaultActiveKey="1"
                  tabPosition='top'
                >
                  <TabPane
                    tab={<span><Icon type='wallet' />{strings.my_wallets}</span>}
                    key='1'
                  >
                    <WalletContainer />
                  </TabPane>
                  <TabPane
                    tab={<span><Icon type='table' />{strings.transaction_history}</span>}
                    key='2'
                  >
                    <TransactionContainer
                      userId={userId}
                      tab={tab}
                    />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </>
        )
      }}
    </Query>
  )
}

export default compose(
  withApollo,
)(ProfileContainer)
