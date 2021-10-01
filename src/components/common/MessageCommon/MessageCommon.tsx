import React, { memo, useEffect } from 'react'
import s from './MessageCommon.module.scss'
import MessageItem, { MessageItemProps } from './MessageItem/MessageItem'

interface Props {
  messages: MessageItemProps[]
  onRemove?: (id: number) => void
}

const MessageCommon = memo(({ messages, onRemove }: Props) => {  
  return (
    <div className={s.messageCommon}>
      {messages.reverse().map((item) => (
        <MessageItem
          key={item.id}
          id={item.id}
          type={item.type}
          content={item.content}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
})

MessageCommon.displayName = 'MessageCommon'
export default MessageCommon