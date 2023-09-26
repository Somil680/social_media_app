'use client'
import { BookmarkBy, RemoveBookmark } from '@/redux/slices/postSlice'
import { RootState } from '@/redux/store'
import React from 'react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
// import styles from './styles.module.css'

type Props = {
    item:any
}

const BookmarkButton = ({ item }: Props) => {
    
    const dispatch = useDispatch()
    const isBookmark = useSelector((state: RootState) => state.post.isBookmark)
    const isInBookmark = isBookmark.some((element) => element._id === item._id)
    console.log(isInBookmark)
    function toggleHandler() {
        if (isInBookmark) {
            dispatch(RemoveBookmark(item._id))
        } else {
            dispatch(BookmarkBy(item))
    }
    }
    return <>
    <div onClick={toggleHandler}>
         {isInBookmark ? (<BsBookmarkFill/>) : (<BsBookmark/>)}
        </div>
    </>
}

export default BookmarkButton