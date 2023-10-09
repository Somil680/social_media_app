'use client'
import React, { useEffect } from 'react'
import PostView from '@/components/Hompage/PostView'
import FollowContainer from '@/components/Hompage/FollowContainer'
import { Avatar, Button, Card, Divider } from '@nextui-org/react'
import Loading from './loading'
import FeedContainer from '@/components/Hompage/FeedContainer'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { fetchUserData } from '@/redux/slices/userData'
import { redirect } from 'next/navigation'
import { fetchAllUserData } from '@/redux/slices/allUserData'
import { fetchFeedData } from '@/redux/slices/feed'
import { openModal } from '@/redux/slices/modal'

export default function Home() {
  const { data: session }: any =
    useSession()
    // {
    // required: true,
    // onUnauthenticated() {
    //   redirect('/login?callbackUrl=https://connecte.vercel.app')
    // },
    // }
  const dispatch = useDispatch<any>()
  const { data, loading, error } = useSelector(
    (state: RootState) => state.profile
  )
  const handle = () => {
    dispatch(
      openModal({
        type: 'createPost',
        data: data,
      })
    )
  }

  useEffect(() => {
    if (!session) return
    dispatch(fetchUserData(session?.user?._id))
    dispatch(fetchAllUserData(session?.user?._id))
    dispatch(fetchFeedData())
  }, [dispatch, session])

  return (
    <div className="max-w-[1256px] h-full mt-[75px] flex flex-col justify-center items-center ">
      {loading ?? <Loading />}
      <div className=" flex justify-center   gap-3 rounded-md mt-0 ">
        <div className="">
          <FeedContainer />
        </div>
        <Divider orientation="vertical" />
        <div className="flex flex-col ">
          <Card className="w-[500px] min-h-20 flex flex-row items-center gap-4 p-3 ">
            <Avatar isBordered src={data?.users?.profile_pic} />
            <Button
              className="w-[430px]  h-12 rounded-3xl border-2 border-gray-300 bg-white text-gray-400   pl-7 flex items-center justify-start "
              // onPress={onOpen}
              onClick={handle}
            >
              Start a Post
            </Button>
          </Card>
          <Divider className="my-2" />
          <PostView />
        </div>
        <Divider orientation="vertical" />
        <div className="">
          <FollowContainer />
        </div>
      </div>
    </div>
  )
}
