'  use client '
import React from 'react'
import { DisLikedBy, LikedBy } from '@/redux/slices/postSlice'
import { RootState } from '@/redux/store'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  item: any
}

const LikeButton = ({ item }: Props) => {
  const dispatch = useDispatch()
  const isLiked = useSelector((state: RootState) => state.post.isLiked)

  const isInLiked = isLiked.some((element) => element._id === item._id)
  function toggleHandler() {
    if (isInLiked) {
      dispatch(DisLikedBy(item._id))
    } else {
      dispatch(LikedBy(item))
    }
  }
  return (
    <>
      <div onClick={toggleHandler} className="flex gap-3">
        {isInLiked ? (
          <BsHeartFill fill="red" fontSize={20} />
        ) : (
          <BsHeart fontSize={20} />
        )}
        <p className="text-sm">Like</p>
      </div>
    </>
  )
}

export default LikeButton
