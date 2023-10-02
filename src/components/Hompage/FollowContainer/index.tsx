' use client;'
import { getAllUser } from '@/services/services'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
// import styles from './styles.module.css'

type Props = {}

const FollowContainer = ({}: Props) => {
  const [data, setData] = useState([])
  const { data: session }: any = useSession()
  const getAllUsers = async () => {
    const { res, err } = await getAllUser()
    if (!res || err) throw new Error('Fetch failed')
    const { users } = await res.json()
    const filterData = users.filter(
      (item: any) => item._id !== session?.user?._id
    )
    setData(filterData)
    console.log('🚀 ~ file: index.tsx:13 ~ getAllUsers ~ user:', filterData)
  }
  useEffect(() => {
    getAllUsers()
  }, [])
  return (
    <>
      <div className="w-full h-80 bg-white  overflow-y-scroll">
        {data.map((item: any) => (
          <>
            <div className="flex w-72 justify-between m-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 "></div>
                <p>{item.username}</p>
              </div>
              <button>Follow</button>
            </div>
          </>
        ))}
      </div>
    </>
  )
}

export default FollowContainer
