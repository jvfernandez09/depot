import React from 'react'
import { Table, Input, DatePicker, Card } from 'antd'
import '../transaction/index.scss'

// const Search = Input.Search
const { RangePicker } = DatePicker

const TransactionContainer = (props) => {
  const dataSource = [
  {
    key: '1',
    senderReceipient: 'ndbruf-e7r5oa-nede43-vctmuv-rhti6x-z7tqfv-ntmu / nagjg3-qfwyz3-7lmi7i-qpsgqn-yadgsj-zgjrd2-diya',
    amountFee: 32,
    paymentMode: 'Paypal',
    timeStamp: '2019-09-12'
  },
  {
    key: '2',
    senderReceipient: 'ndbruf-e7r5oa-nede43-vctmuv-rhti6x-z7tqfv-ntmu / nagjg3-qfwyz3-7lmi7i-qpsgqn-yadgsj-zgjrd2-diya',
    amountFee: 45,
    paymentMode: 'BTC',
    timeStamp: '2019-09-15'
  },
  {
    key: '3',
    senderReceipient: 'ndbruf-e7r5oa-nede43-vctmuv-rhti6x-z7tqfv-ntmu / nagjg3-qfwyz3-7lmi7i-qpsgqn-yadgsj-zgjrd2-diya',
    amountFee: 55,
    paymentMode: 'NEM',
    timeStamp: '2019-09-17'
  },
  {
    key: '4',
    senderReceipient: 'ndbruf-e7r5oa-nede43-vctmuv-rhti6x-z7tqfv-ntmu / nagjg3-qfwyz3-7lmi7i-qpsgqn-yadgsj-zgjrd2-diya',
    amountFee: 150,
    paymentMode: 'Coins.ph',
    timeStamp: '2019-09-12'
  },
  {
    key: '5',
    senderReceipient: 'ndbruf-e7r5oa-nede43-vctmuv-rhti6x-z7tqfv-ntmu / nagjg3-qfwyz3-7lmi7i-qpsgqn-yadgsj-zgjrd2-diya',
    amountFee: 200,
    paymentMode: 'Paypal',
    timeStamp: '2019-09-01'
  },
  {
    key: '6',
    senderReceipient: 'ndbruf-e7r5oa-nede43-vctmuv-rhti6x-z7tqfv-ntmu / nagjg3-qfwyz3-7lmi7i-qpsgqn-yadgsj-zgjrd2-diya',
    amountFee: 350,
    paymentMode: 'BTC',
    timeStamp: '2019-09-25'
  },
  {
    key: '7',
    senderReceipient: 'ndbruf-e7r5oa-nede43-vctmuv-rhti6x-z7tqfv-ntmu / nagjg3-qfwyz3-7lmi7i-qpsgqn-yadgsj-zgjrd2-diya',
    amountFee: 500,
    paymentMode: 'BTC',
    timeStamp: '2019-09-25'
  },
];

const columns = [
  {
    title: 'Sender / Recipient',
    dataIndex: 'senderReceipient',
    key: 'senderReceipient',
  },
  {
    title: 'Amount Fee',
    dataIndex: 'amountFee',
    key: 'amountFee',
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
