import React, { useState, useEffect } from 'react'
import { compose, withApollo } from 'react-apollo'
import { Table, DatePicker, Card, Spin } from 'antd'
import { upperFirst, upperCase, toUpper, isNaN } from 'lodash'
import TRANSACTIONS from '../../../../../src/graphql/transaction'
import dayjs from 'dayjs'

import '../transaction/index.scss'
const { RangePicker } = DatePicker

const TransactionContainer = (props, userId) => {
  const [dataSource, setDataSource] = useState()
  const [filterSource, setFilterSource] = useState('')
  const [isLoading, setLoading] = useState(false)
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
    sorter: (a, b) => new Date(a.date) - new Date(b.date)
  },
  {
    title: 'Type',
    dataIndex: 'transactionType',
    key: 'transactionType'
  },
  {
    title: 'Transaction ID',
    dataIndex: 'topUpReceivingWalletAddress',
    key: 'topUpReceivingWalletAddress',
  },
  {
    title: 'GWX Purchased',
    dataIndex: 'gwxToTransfer',
    key: 'gwxToTransfer',
  },
  {
    title: 'Amount Paid',
    dataIndex: 'quantityToReceive',
    key: 'quantityToReceive'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  }
]

  useEffect(() => {
    getTransaction(props)
  }, [props])

  async function getTransaction(props){
    setLoading(true)
    let rowItems = []
    const userId = props.userId
    const { client } = props

    await client.query({
      query: TRANSACTIONS.ALL_TRANSACTIONS,
      variables: {
        userId
      }
    }).then(result => [result][0].data.getAllTransaction.data.map((value, i) => (
        rowItems.push({
          key: i,
          transactionId: value.attributes.transaction_id,
          date: dayjs(value.attributes.created_at).format('DD-MMM-YYYY, hh:mm'),
          transactionType: 'BUY',
          topUpReceivingWalletAddress: toUpper(value.attributes.top_up_receiving_wallet_address),
          gwxToTransfer: value.attributes.gwx_to_transfer,
          quantityToReceive: value.attributes.quantity_to_receive+' '+toUpper(value.attributes.transaction_type),
          status: upperFirst(upperCase(value.attributes.status))
        })
      ))
    ).catch((errors) => {
      console.log(errors)
    })
    setDataSource(rowItems)
    setLoading(false)
  }

  function filterDate(date){
    setLoading(true)
    let start = `${date[0]+ "T00:00:00"}`
    let end = `${date[1]+ "T23:59:59"}`
    start = new Date(start).getTime()
    end = new Date(end).getTime()

    if (!isNaN(start) && !isNaN(end)){
      let result = dataSource.filter(d => { let time = new Date(d.date).getTime()
        return (start < time && time < end)
      })
      setFilterSource(result)
    } else {
      setFilterSource('')
      setDataSource(dataSource)
    }
    setLoading(false)
  }

  return(
    <div className='body-content'>
      <h2 className='title'>Purchase History</h2>
      <Card>
        <div className='action-container'>
          <div className='sub'>
            Sort transactions by date:
          </div>
          <RangePicker
            style={{ width: '50%'}}
            className='date'
            onChange={(date, dateString) => {
              filterDate(dateString)
            }}
          />
        </div>
        <div className='table-container'>
          {isLoading ? <Spin /> :
            <Table
              dataSource={filterSource === '' ? dataSource : filterSource}
              columns={columns}
              loading={isLoading}
              pagination={{ pageSize: 5 }}
              scroll={{ x: 'fit-content' }}
            />
          }
        </div>
      </Card>
    </div>
  )
}

export default compose(
  withApollo
)(TransactionContainer)
