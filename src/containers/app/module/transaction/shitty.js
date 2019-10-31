import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import nem from 'nem-sdk'
import { forEach } from 'lodash'
​
import { endpoint } from '../utils/services'
import { getAddress } from '../utils/storage'
​
const withWalletContext = (props) => (WrappedComponent) => {
  return class Provider extends Component {
    static navigationOptions = {
      header: null
    }
​
    key = ''
    state = {
      address: '',
      balance: 0,
      decimal: '000000',
      isPendingTransaction: false,
      refreshing: false,
      transactions: [],
      unconfirmedTransactions: [],
      user: {}
    }
​
    async componentDidMount () {
      let {
        address,
        balance,
        decimal,
        transactions,
        unconfirmedTransactions,
        user
      } = this.state
      const date = new Date()
​
      user = JSON.parse(await AsyncStorage.getItem('user'))
      this.key = `${props.type}AccountData-${user.id}`
​
      let accountData = await AsyncStorage.getItem(this.key)
      address = await getAddress()
​
      if (accountData) {
        accountData = JSON.parse(accountData)
      }
​
      if (!accountData || date.getTime() - Number(accountData.updatedAt) > 24000000) {
        this.setState({ refreshing: true })
        accountData = await this.getAccountData(user)
      }
​
      balance = accountData.balance
      decimal = accountData.decimal
      transactions = accountData.transactions
      unconfirmedTransactions = accountData.unconfirmedTransactions
​
      this.setState({
        address,
        balance,
        decimal,
        isPendingTransaction: accountData && accountData.unconfirmedTransactions.length > 0,
        refreshing: false,
        transactions,
        unconfirmedTransactions,
        user
      })
    }
​
    async getAccountData (user) {
      const address = await getAddress()
      let account = {}
      let balance = 0
      let decimal = 0
      let transactions = []
      let unconfirmedTransactions = []
​
      let updatedAt = new Date()
      updatedAt = updatedAt.getTime().toString()
​
      /*
       * Operation if type is NOT MOSAIC
       * */
      if (props.type === 'xem') {
        account = await nem.com.requests.account.data(endpoint, address)
        account = account.account
​
        if (account) {
          balance = Math.floor(account.balance / 1000000)
          decimal = account.balance % 1000000
        }
​
        // Get all nem transfers
        transactions = await nem.com.requests.account.transactions.all(``, address)
        transactions = transactions.data.filter(({ transaction }) => transaction.mosaics === undefined)
​
        // Get unconfirmed nem transfers
        unconfirmedTransactions = await nem.com.requests.account.transactions.unconfirmed(endpoint, address)
        unconfirmedTransactions = unconfirmedTransactions.data.filter(({ transaction }) => transaction.mosaics === undefined)
​
        if (unconfirmedTransactions.length > 0) {
          forEach(unconfirmedTransactions, ({ transaction }) => {
            const { amount, fee } = transaction
​
            if (transaction.recipient === this.state.address) {
              balance += Math.floor(amount / 1000000)
              decimal += (amount % 1000000)
            } else {
              balance -= Math.floor(amount / 1000000)
              decimal -= ((amount + fee) % 1000000)
            }
          })
​
          this.setState({ isPendingTransaction: true })
        } else {
          this.setState({ isPendingTransaction: false })
        }
      /*
       * Operation if type is MOSAIC
       * */
      } else {
        account = await nem.com.requests.account.mosaics.owned(endpoint, address)
        account = account.data.find(item => item.mosaicId.name === props.type)
​
        if (account) {
          balance = Math.floor(account.quantity / 1000000)
          decimal = account.quantity % 1000000
        }
​
        // Get all mosaic transfers
        transactions = await nem.com.requests.account.transactions.all(endpoint, address)
        transactions = transactions.data.filter(({ transaction: { mosaics } }) => (
          mosaics && mosaics.length > 0 && mosaics[0].mosaicId.name === 'gwx'
        ))
​
        // Get unconfirmed transactions
        unconfirmedTransactions = await nem.com.requests.account.transactions.unconfirmed(endpoint, address)
        unconfirmedTransactions = unconfirmedTransactions.data.filter(({ transaction: { mosaics } }) => (
          mosaics && mosaics.length > 0 && mosaics[0].mosaicId.name === 'gwx'
        ))
​
        if (unconfirmedTransactions.length > 0) {
          forEach(unconfirmedTransactions, ({ transaction }) => {
            const { quantity } = transaction.mosaics.find(item => item.mosaicId.name === props.type)
​
            if (transaction.recipient === this.state.address) {
              balance += Math.floor(quantity / 1000000)
              decimal += (quantity % 1000000)
            } else {
              balance -= Math.floor(quantity / 1000000)
              decimal -= (quantity % 1000000)
            }
          })
​
          this.setState({ isPendingTransaction: true })
        } else {
          this.setState({ isPendingTransaction: false })
        }
      }
​
      decimal = decimal.toString().padStart(6, '0')
​
      AsyncStorage.setItem(this.key, JSON.stringify({
        balance,
        decimal,
        transactions,
        unconfirmedTransactions,
        updatedAt
      }))
​
      return {
        balance,
        decimal,
        transactions,
        unconfirmedTransactions,
        updatedAt
      }
    }
​
    handleRefresh = async () => {
      this.setState({ refreshing: true })
​
      let user = await AsyncStorage.getItem('user')
      user = JSON.parse(user)
​
      const {
        balance,
        decimal,
        transactions,
        unconfirmedTransactions
      } = await this.getAccountData(user)
​
      this.setState({
        balance,
        decimal,
        refreshing: false,
        transactions,
        unconfirmedTransactions
      })
    }
​
    render () {
      const {
        address,
        balance,
        decimal,
        isPendingTransaction,
        refreshing,
        transactions,
        unconfirmedTransactions,
        user
      } = this.state
​
      const allTransactions = unconfirmedTransactions.concat(transactions)
​
      return (
        <WrappedComponent
          address={address}
          allTransactions={allTransactions}
          balance={balance}
          decimal={decimal}
          isPendingTransaction={isPendingTransaction}
          onRefresh={this.handleRefresh}
          refreshing={refreshing}
          type={props.type}
          user={user}
          {...this.props}
        />
      )
    }
  }
}
​
export default withWalletContext