import React from 'react'
import styles from './styles.module.css'

type Props = {}

const Message = ({}: Props) => {
  return (
    <div className="mt-96">
      <input type="text" placeholder="Enter a message" />
      <button>Send</button>
    </div>
  )
}

export default Message
