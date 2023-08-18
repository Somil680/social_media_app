'use client'
import React from 'react'
import PostView from '@/components/Hompage/PostView'

import FollowContainer from '@/components/Hompage/FollowContainer'
import FeedContainer from '@/components/Hompage/FeedContainer'
import { getSession, useSession } from 'next-auth/react'

export default function Home() {
  const isdata = async () => {
    const session = await getSession()
    console.log(session)
    console.log(session?.user?.name)
  }
  isdata()
  const { data }: any = useSession
  console.log('🚀 ~ file: page.tsx:16 ~ Home ~ data:', data)

  return (
    <div className="max-w-[1256px] h-full mt-2  flex justify-center items-center  gap-10 rounded-md ">
      {/* <FeedContainer /> */}
      <PostView />
      {/* <FollowContainer /> */}
    </div>
  )
}
