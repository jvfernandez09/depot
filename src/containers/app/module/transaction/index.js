import React from 'react'
import { compose, withApollo, Query } from 'react-apollo'
import { Table, DatePicker, Card, Spin } from 'antd'
import { upperFirst, upperCase, toUpper } from 'lodash'
import TRANSACTIONS from '../../../../../src/graphql/transaction'

import '../transaction/index.scss'

const { RangePicker } = DatePicker


const TransactionContainer = (props, userId) => {

const columns = [
  {
    title: 'ID',
    dataIndex: 'transactionId',
    key: 'transactionId',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => b.transactionId - a.transactionId
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => new Date(a.date) - new Date(b.date)
  },
  {
    title: 'Type',
    dataIndex: 'transactionType',
    key: 'transactionType'
  },
  {
    title: 'Wallet Address',
    dataIndex: 'topUpReceivingWalletAddress',
    key: 'topUpReceivingWalletAddress',
  },
  {
    title: 'GWX to Transfer',
    dataIndex: 'gwxToTransfer',
    key: 'gwxToTransfer',
  },
  {
    title: 'Payment',
    dataIndex: 'quantityToReceive',
    key: 'quantityToReceive'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  }
]

  function getTransaction(props){
    let rowItems = []
    const userId = props.userId
    return(
      <Query query={TRANSACTIONS.ALL_TRANSACTIONS} variables={{ userId }}>
      {({ data, loading, error }) => {
        if (loading) return <Spin />
        if (error) return <p>ERROR</p>
        const converted = [data]
        converted[0].getAllTransaction.data.map((value, i) =>
          rowItems.push({
            key: i,
            transactionId: value.attributes.transaction_id,
            date: value.attributes.created_at,
            transactionType: 'SENDING',
            topUpReceivingWalletAddress: toUpper(value.attributes.top_up_receiving_wallet_address),
            gwxToTransfer: value.attributes.gwx_to_transfer,
            quantityToReceive: value.attributes.quantity_to_receive+' '+toUpper(value.attributes.transaction_type),
            status: upperFirst(upperCase(value.attributes.status))
          })
        )

        return(
          <Table dataSource={rowItems} columns={columns}  pagination={{ pageSize: 5 }} scroll={{ x: 'fit-content' }}/>
        )
      }}
      </Query>
    )
  }

  return(
    <div className='body-content'>
      <h2 className='title'>My Transactions</h2>
      <Card>
        <div className='action-container'>
          <div className='sub'>
            Sort transactions by date:
          </div>
          <RangePicker style={{ width: '50%'}} className='date'/>
        </div>
        <div className='table-container'>
        {getTransaction(props)}
        </div>
      </Card>
    </div>
  )
}

export default compose(
  withApollo
)(TransactionContainer)
