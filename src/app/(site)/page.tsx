'use client'
import React, { useEffect } from 'react'
import PostView from '@/components/Hompage/PostView'
import FollowContainer from '@/components/Hompage/FollowContainer'
import { Avatar } from '@nextui-org/react'
import Loading from './loading'
import FeedContainer from '@/components/Hompage/FeedContainer'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { fetchUserData } from '@/redux/slices/userData'
import { fetchAllUserData } from '@/redux/slices/allUserData'
import { fetchFeedData } from '@/redux/slices/feed'
import { openModal } from '@/redux/slices/modal'
import styles from './styles.module.css'

export default function Home() {
  const { data: session }: any = useSession()
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
    if (data) return
    dispatch(fetchUserData(session?.user?._id))
    dispatch(fetchAllUserData(session?.user?._id))
    dispatch(fetchFeedData())
  }, [])

  return (
    <div className={styles['main-container']}>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles['container']}>
          <div className={styles['feed-container']}>
            <FeedContainer />
          </div>

          <div className={styles['post-container']}>
            <div className={styles['create-container']}>
              <Avatar isBordered src={data?.users?.profile_pic} />
              <button onClick={handle}>Start a Post</button>
            </div>
            <PostView />
          </div>

          <div className={styles['follow-container']}>
            <FollowContainer />
          </div>
        </div>
      )}
    </div>
  )
}

{
}
