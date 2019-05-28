import React from 'react'
import { Input as AntdInput } from 'antd'
import './index.scss'

const Input = props => (
  <AntdInput {...props} className={props.className || "input"} />
)

export default Input
