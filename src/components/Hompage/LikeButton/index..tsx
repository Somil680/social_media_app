' use client'
import React from 'react'
import { DisLikedBy, LikedBy } from '@/redux/slices/postSlice'
import { RootState } from '@/redux/store'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
    item : any
}

const LikeButton = ({ item }: Props) => {
    const dispatch = useDispatch()
    const isLiked = useSelector((state: RootState) => state.post.isLiked)
    
    const isInLiked = isLiked.some((element) => element._id === item._id)
    console.log(isInLiked)
    function toggleHandler() {
        if (isInLiked) {
            dispatch(DisLikedBy(item._id))
        } else {
            dispatch(LikedBy(item))
    }
    }
    return <>
    <div onClick={toggleHandler}>
         {isInLiked ? (<BsHeartFill fill='red'/>) : (<BsHeart/>)}
        </div>
    </>
}

export default LikeButton


