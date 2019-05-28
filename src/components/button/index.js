import React from 'react'
import { Button as AntdButton } from 'antd'
import './index.scss'

const Button = props => (
  <AntdButton {...props} className={props.className || "button"} />
)

export default Button
