'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import io from 'socket.io-client'
import {
  getAllMessageById,
  getAllRooms,
  postMessageById,
} from '@/services/services'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Room } from '@/types'
import { Avatar } from '@nextui-org/react'
import { format } from 'date-fns'

const End = 'http://localhost:5000'
var socket: any, selectedChatCompare: any
const Message = () => {
  const [socketConnected, setSocketConnected] = useState(false)
  const { data, loading } = useSelector((state: RootState) => state.profile)
  const [isData, setIsData] = useState([])
  const [messageData, setMessageData] = useState<any>([])
  const [inputData, setInputData] = useState('')
  const [selectChat, setSelectChat] = useState<Room>()
  console.log('🚀 ~ Message ~ selectChat:', selectChat)
  const scrollRef: any = useRef()
  useEffect(() => {
    socket = io(End)
    socket.emit('setup', data?.users)
    socket.on('connection', () => setSocketConnected(true))
  }, [])

  useEffect(() => {
    fetchRoomMessages(selectChat?._id)
    selectedChatCompare = selectChat
    console.log('🚀 ~ useEffect ~ selectedChatCompare:', selectedChatCompare)
  }, [selectChat])

  useEffect(() => {
    console.log('1')
    socket.on('message received', (newMessageReceived: any) => {
      console.log('2')
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.roomId._id
      ) {
        // notify
        console.log('🚀 ~ socket.on ~ notify: 3')
      } else {
        const newMessage = {
          roomId: newMessageReceived.roomId._id,
          sender: newMessageReceived.sender._id,
          text: newMessageReceived.text,
          createdAt: newMessageReceived.createdAt,
          updatedAt: newMessageReceived.updatedAt,
          _id: newMessageReceived._id,
        }
        setMessageData([...messageData, newMessage])
        console.log('🚀 ~ socket.on ~ MessageData:', messageData)
      }
    })
  })

  useEffect(() => {
    fetchRooms(data?.users?._id)
  }, [])

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messageData])

  const fetchRooms = async (id: any) => {
    const { res, err } = await getAllRooms(id)
    if (err || !res || !res.ok) throw new Error('Fetch failed!')
    const json = await res.json()
    setIsData(json)
  }

  const fetchRoomMessages = async (id: any) => {
    const { res, err } = await getAllMessageById(id)
    if (err || !res || !res.ok) throw new Error('Fetch failed!')
    const data = await res.json()
    setMessageData(data)
  }

  const handleSendMsg = async () => {
    const jsonData = {
      sender: data?.users?._id,
      roomId: selectChat?._id,
      text: inputData,
    }
    try {
      const { res, err } = await postMessageById(jsonData)
      if (err || !res || !res.ok) throw new Error('Fetch failed!')
      const json = await res.json()
      const newMessage = {
        roomId: json.roomId._id,
        sender: json.sender._id,
        text: json.text,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt,
        _id: json._id,
      }
      socket.emit('new message', json)
      setMessageData([...messageData, newMessage])
    } catch (error) {
      console.log('🚀 ~ handleSendMsg ~ error:', error)
    }
  }

  return (
    <div className={styles['container']}>
      <div className={styles['room-container']}>
        <div className={styles['username']}>
          <Avatar
            radius="full"
            size="md"
            showFallback
            name={data?.users?.username}
            src={data?.users?.profile_pic}
            className=""
          />{' '}
          <p>{data?.users?.username}</p>
        </div>
        <div>
          {isData.map((item: any) => {
            const users = item.members.filter(
              (item: any) => item._id !== data?.users?._id
            )
            return (
              <>
                <div
                  className={styles['room']}
                  onClick={() => {
                    setSelectChat(item), socket.emit('joinRoom', item._id)
                  }}
                >
                  {users.map((row: any) => {
                    return (
                      <>
                        <Avatar
                          radius="full"
                          size="md"
                          showFallback
                          name={row?.username}
                          src={row?.profile_pic}
                          className=""
                        />{' '}
                        <p className="text-white">{row.username}</p>
                      </>
                    )
                  })}
                </div>
              </>
            )
          })}
        </div>
      </div>
      <div className={styles['inbox-container']}>
        {selectChat && (
          <>
            <div className={styles['']}>
              {[selectChat]?.map((item: any) => {
                const users = item.members.filter(
                  (item: any) => item._id !== data?.users?._id
                )
                return (
                  <>
                    <div
                      className={styles['room']}
                      // onClick={() => {
                      //   setSelectChat(item), socket.emit('joinRoom', item._id)
                      // }}
                    >
                      {users.map((row: any) => {
                        return (
                          <>
                            <Avatar
                              radius="full"
                              size="md"
                              showFallback
                              name={row?.username}
                              src={row?.profile_pic}
                              className=""
                            />{' '}
                            <p className="text-white">{row.username}</p>
                          </>
                        )
                      })}
                    </div>
                  </>
                )
              })}
            </div>
            <div ref={scrollRef} className={styles['message_container']}>
              {messageData.map((row: any) => (
                <>
                  <div
                    className={` ${styles['message_text_container']} ${
                      data?.users?._id === row.sender
                        ? 'justify-end '
                        : 'justify-start'
                    }  `}
                  >
                    <div className={styles['message_text']}>
                      <p className={styles['msg_text']}>{row.text}</p>
                      <span>{format(new Date(row.createdAt), 'HH.mm')} </span>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className={styles['input_field']}>
              <input
                type="text"
                className={styles['input']}
                value={inputData}
                onChange={(e: any) => setInputData(e.target.value)}
              />
              <button type="submit" onClick={() => handleSendMsg()}>
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Message
