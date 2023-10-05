'use client'
import React, { useEffect } from 'react'

import PostView from '@/components/Hompage/PostView'
import FollowContainer from '@/components/Hompage/FollowContainer'
import CreatePost from '@/components/Hompage/CreatePost'
import { Divider } from '@nextui-org/react'

import FeedContainer from '@/components/Hompage/FeedContainer'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { fetchUserData } from '@/redux/slices/userData'

export default function Home() {
  const { data: session }: any = useSession()

  const dispatch = useDispatch<any>()
  const { data, loading, error } = useSelector(
    (state: RootState) => state.profile
  )
  console.log('🚀 ~ file: index.tsx:17 ~ FollowButton ~ data:', data)

  useEffect(() => {
    dispatch(fetchUserData(session?.user?._id))
  }, [dispatch, session?.user?._id])

  return (
    <div className="max-w-[1256px] h-full mt-[75px] flex flex-col justify-center items-center ">
      <div className=" flex justify-center   gap-3 rounded-md mt-0 ">
        {/* <FeedContainer /> */}
        <div className="flex flex-col ">
          <CreatePost />
          <Divider className="my-2" />
          {/* <button onClick={() => dispatch(fetchUserData(session?.user?._id))}>
            fetch data
          </button> */}
          <PostView />
        </div>
        <Divider orientation="vertical" />
        <FollowContainer />
      </div>
    </div>
  )
}
