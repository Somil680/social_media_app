' use client;'
import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
import { getAllUser } from '@/services/services'
import {
  Avatar,
  Card,
  CardFooter,
  Divider,
  User,
  Link,
} from '@nextui-org/react'
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
      <Card className="w-[350px] p-4  sticky top-[65px] ">
        <div className="h-[400px] overflow-hidden flex flex-col gap-3">
          <h2 className="font-semibold">Who to follow</h2>
          {filterData
            ?.slice()
            .reverse()
            .map((item: any) => {
              return (
                <>
                  <div className="flex w-[300px]  justify-between items-center ">
                    {/* <Link href={`/profile/${item._id}`}>
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
                    </Link> */}
                    <Link href={`/profile/${item._id}`}>
                      <User
                        name={`${item.first_name} ${item.last_name}`}
                        description={item.username}
                        avatarProps={{
                          src: `${item?.profile_pic}`,
                        }}
                      />
                    </Link>

                    <div className="w-[70px]">
                      <FollowButton userData={item} />
                    </div>
                  </div>
                </>
              )
            })}
        </div>
        <Divider className="my-2 " />
        <CardFooter className="p-0  flex justify-center">
          {' '}
          <Link href={`/connection`}>Show More</Link>
        </CardFooter>
      </Card>
    </>
  )
}

export default FollowContainer
