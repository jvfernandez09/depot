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
    dataIndex: 'gwxTransactionHash',
    key: 'gwxTransactionHash',
  },
  {
    title: 'Amount Paid',
    dataIndex: 'gwxToTransfer',
    key: 'gwxToTransfer',
  },
  {
    title: 'GWX Transferred',
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
          date: dayjs(value.attributes.created_at).format('DD-MMM-YYYY, HH:mm'),
          transactionType: 'BUY',
          gwxTransactionHash: value.attributes.gwx_transaction_hash,
          quantityToReceive: value.attributes.transaction_type === "xem" ?
          parseFloat(value.attributes.gwx_to_transfer).toFixed(6)+' '+toUpper(value.attributes.transaction_type) :
          parseFloat(value.attributes.gwx_to_transfer).toFixed(8)+' '+toUpper(value.attributes.transaction_type),
          gwxToTransfer: value.attributes.quantity_to_receive,
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


  columns[3].render = (text, record) => (
    <a
      rel="noopener noreferrer"
      target="_blank" href={`http://explorer.nemtool.com/?fbclid=IwAR16X2gZe-pC0gUDpjzGKvbNc8AoLaLjWFO9-HIRuzbDE1dhj2J6MPewoI0#/s_tx?hash=${record.gwxTransactionHash}`}>
      {record.gwxTransactionHash}
    </a>
  )

  columns[4].render = (text, record) => (
    <>
      <div style={{ width: '10%'}}>{record.quantityToReceive} </div>
    </>
  )

  columns[5].render = (text, record) => (
    <>
      <div style={{ width: '10%'}}> {record.gwxToTransfer} </div>
    </>
  )

  columns[6].render = (text, record) =>(
    <>
      {record.status === "PENDING" ?
      <span style={{ color: 'orange'}}> {record.status} </span>
      : record.status === "INITIATED" || record.status === "TRANSACTION UNSUCCESSFUL" ?
      <span style={{ color: 'red'}}> {record.status} </span>
      : <span style={{ color: 'green'}}> {record.status} </span>}
    </>
  )

  return(
    <div className='body-content'>
      <h2 className='title'>Transaction History</h2>
      <Card>
        <div className='action-container'>
          <div className='sub'>
            Filter transactions by date:
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
