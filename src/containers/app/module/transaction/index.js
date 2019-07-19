import React from 'react'
import { Table, DatePicker, Card } from 'antd'
import '../transaction/index.scss'

const { RangePicker } = DatePicker

const TransactionContainer = (props) => {
  const dataSource = [
  {
    key: '1',
    details: '1000',
    amountFee: 32,
    paymentMode: 'Paypal',
    timeStamp: '2019-09-12'
  },
  {
    key: '2',
    details: '500',
    amountFee: 45,
    paymentMode: 'BTC',
    timeStamp: '2019-09-15'
  },
  {
    key: '3',
    details: '2000',
    amountFee: 55,
    paymentMode: 'NEM',
    timeStamp: '2019-09-17'
  },
  {
    key: '4',
    details: '300',
    amountFee: 150,
    paymentMode: 'Coins.ph',
    timeStamp: '2019-09-12'
  },
  {
    key: '5',
    details: '4000',
    amountFee: 200,
    paymentMode: 'Paypal',
    timeStamp: '2019-09-01'
  },
  {
    key: '6',
    details: '1500',
    amountFee: 350,
    paymentMode: 'BTC',
    timeStamp: '2019-09-25'
  },
  {
    key: '7',
    details: '3500',
    amountFee: 500,
    paymentMode: 'BTC',
    timeStamp: '2019-09-25'
  },
];

const columns = [
  {
    title: 'Details',
    dataIndex: 'details',
    key: 'details',
  },
  {
    title: 'Fee',
    dataIndex: 'amountFee',
    key: 'amountFee',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Payment Mode',
    dataIndex: 'paymentMode',
    key: 'paymentMode',
  },
  {
    title: 'Timestamp',
    dataIndex: 'timeStamp',
    key: 'timeStamp',
  },
]

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
          <Table dataSource={dataSource} columns={columns} pagination={{ defaultPageSize: 5 }} className='table' />
        </div>
      </Card>
    </div>
  )
}

export default TransactionContainer
