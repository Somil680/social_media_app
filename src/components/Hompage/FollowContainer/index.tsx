' use client;'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllUser } from '@/services/services'
import { Avatar, Card } from '@nextui-org/react'
import { useSelector } from 'react-redux'
import FollowButton from '@/components/followButton'
import { RootState } from '@/redux/store'
// import styles from './styles.module.css'

type Props = {}

const FollowContainer = ({}: Props) => {
  const [userData, setUserData] = useState([])
  const { data } = useSelector((state: RootState) => state.profile)

  const getAllUsers = async () => {
    const { res, err } = await getAllUser()
    if (!res || err) throw new Error('Fetch failed')
    const { users } = await res.json()
    const filterData = users.filter(
      (item: any) => item._id !== data?.users?._id
    )
    setUserData(filterData)
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <>
      <Card className="max-w-[500px]  h-fit p-4  flex flex-col gap-3">
        <h2 className="font-semibold">Who to follow</h2>
        {userData.map((item: any) => (
          <>
            <div className="flex w-72 justify-between items-center ">
              <Link href={`/profile/${item._id}`}>
                <div className="flex items-center gap-3">
                  <Avatar radius="full" size="md" src={item?.profile_pic} />{' '}
                  <p>{item.username}</p>
                </div>
              </Link>
              <FollowButton userData={item} />
            </div>
          </>
        ))}
      </Card>
    </>
  )
}

export default FollowContainer
