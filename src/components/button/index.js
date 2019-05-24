import React from 'react'
import { Button as AntdButton } from 'antd'
import './index.scss'

const Button = props => (
  <div>
  <AntdButton {...props} className={props.className || "Button"} />
  </div>
)

export default Button
