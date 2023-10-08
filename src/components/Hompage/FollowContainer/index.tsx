' use client;'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllUser } from '@/services/services'
import { Avatar, Card } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import FollowButton from '@/components/followButton'
import { RootState } from '@/redux/store'
import { useSession } from 'next-auth/react'
import { fetchAllUserData } from '@/redux/slices/allUserData'
// import styles from './styles.module.css'

type Props = {}

const FollowContainer = ({}: Props) => {
  const { data: session }: any = useSession()
  const { data, loading, error } = useSelector(
    (state: RootState) => state.allUsers
  )
  const filterData = data?.filter(
    (item: any) => item._id !== session?.user?._id
  )

  return (
    <>
      <Card className="max-w-[500px]  h-fit p-4  flex flex-col gap-3">
        <h2 className="font-semibold">Who to follow</h2>
        {filterData?.map((item: any) => {
          return (
            <>
              <div className="flex w-72 justify-between items-center ">
                <Link href={`/profile/${item._id}`}>
                  <div className="flex items-center gap-3">
                    <Avatar
                      radius="full"
                      size="md"
                      showFallback
                      name={item?.first_name}
                      src={item?.profile_pic}
                      className=""
                    />{' '}
                    <p>{item.username}</p>
                  </div>
                </Link>
                <FollowButton userData={item} />
              </div>
            </>
          )
        })}
      </Card>
    </>
  )
}

export default FollowContainer
