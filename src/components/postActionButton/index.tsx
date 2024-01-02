import { fetchFeedData } from '@/redux/slices/feed'
import { fetchUserData } from '@/redux/slices/userData'
import { RootState } from '@/redux/store'
import {
  putLikeThePost,
  putSavedThePost,
  putUnSavedThePost,
} from '@/services/services'
import React, { useState } from 'react'
// import styles from './styles.module.css'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'
import { IoPaperPlaneOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  userData: any
}

const PostActionButton = ({ userData }: Props) => {
  const dispatch = useDispatch<any>()

  const { data } = useSelector((state: RootState) => state.profile)
  console.log('🚀 ~ file: index.tsx:25 ~ PostActionButton ~ data:', data)
  const [isLike, setIsLike] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const liked = userData?.like.includes(data?.users?._id)
  const arrayOfSaved = data?.users?.bookmark.map((item: any) => item._id)
  const Saved = arrayOfSaved?.includes(userData?._id)

  const handleOnClick = async () => {
    const jsonData = {
      userId: data?.users?._id,
    }
    const { res, err } = await putLikeThePost(jsonData, userData?._id)
    if (err || !res || !res.ok) throw new Error('Fetch failed!')
    const { message } = await res.json()
    dispatch(fetchFeedData())
  }
  const handleOnClickSaved = async (str: string) => {
    const jsonData = {
      postId: userData?._id,
    }
    if (str === 'save') {
      const { res, err } = await putSavedThePost(jsonData, data?.users?._id)
      if (err || !res || !res.ok) throw new Error('Fetch failed!')
      const { message } = await res.json()
    } else {
      const { res, err } = await putUnSavedThePost(jsonData, data?.users?._id)
      if (err || !res || !res.ok) throw new Error('Fetch failed!')
      const { message } = await res.json()
    }
  }

  return (
    <>
      <div className=" w-full flex justify-between gap-3">
        <span className="flex gap-3">
          {isLike || liked ? (
            <BsHeartFill
              onClick={() => {
                handleOnClick(), setIsLike(false)
              }}
              fill="red"
              fontSize={20}
            />
          ) : (
            <BsHeart
              onClick={() => {
                handleOnClick(), setIsLike(true)
              }}
              fontSize={20}
            />
          )}

          {/* <p className="text-sm">Like </p> */}
        </span>
        <span className="flex gap-3">
          <FaRegComment fontSize={20} />
          {/* <p className="text-sm">Comments</p> */}
        </span>
        <span className="flex gap-3">
          <IoPaperPlaneOutline fontSize={20} />
          {/* <p className="text-sm">Send</p> */}
        </span>
        <span className="flex gap-3">
          {isSaved || Saved ? (
            <BsBookmarkFill
              fontSize={20}
              onClick={() => {
                setIsSaved(false), handleOnClickSaved('unSave')
              }}
            />
          ) : (
            <BsBookmark
              fontSize={20}
              onClick={() => {
                setIsSaved(true), handleOnClickSaved('save')
              }}
            />
          )}
          {/* {isSaved || Saved ? (
            <p className="text-sm">Saved</p>
          ) : (
            <p className="text-sm">Save</p>
          )} */}
        </span>
      </div>
    </>
  )
}

export default PostActionButton
