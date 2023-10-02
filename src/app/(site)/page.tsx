'use client'
import React, { useEffect } from 'react'
import PostView from '@/components/Hompage/PostView'

import FollowContainer from '@/components/Hompage/FollowContainer'
import FeedContainer from '@/components/Hompage/FeedContainer'
import { getSession, useSession } from 'next-auth/react'
import CreatePost from '@/components/Hompage/CreatePost'

export default function Home() {
  const data = async () => {
    const session = await getSession()
  }
  useEffect(() => {
    data()
  })

  return (
    <div className="max-w-[1256px] h-full mt-2 flex flex-col justify-center items-center ">
      {/* <CreatePost /> */}

      <div className=" flex justify-center   gap-10 rounded-md mt-10 ">
        {/* <FeedContainer /> */}
        <PostView />
        <FollowContainer />
      </div>
    </div>
  )
}
