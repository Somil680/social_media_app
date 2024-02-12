import { fetchFeedData } from '@/redux/slices/feed'
import { fetchUserData } from '@/redux/slices/userData'
import { RootState } from '@/redux/store'
import {
  commentOnThePost,
  putLikeThePost,
  putSavedThePost,
  putUnSavedThePost,
} from '@/services/services'
import React, { useState } from 'react'
import styles from './styles.module.css'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'
import { IoPaperPlaneOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from '@nextui-org/react'

type Props = {
  userData: any
}

const PostActionButton = ({ userData }: Props) => {
  const dispatch = useDispatch<any>()
  const { data } = useSelector((state: RootState) => state.profile)
  const [isLike, setIsLike] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const liked = userData?.like.includes(data?.users?._id)
  const arrayOfSaved = data?.users?.bookmark.map((item: any) => item._id)
  const Saved = arrayOfSaved?.includes(userData?._id)

  const handleOnClick = async () => {
    const jsonData = {
      userId: data?.users?.id,
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
  const [openComment, setOpenComment] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const handleCommentBox = async () => {
    const jsonData = {
      content: inputMessage,
      userId: data?.users?._id,
    }

    const { res, err } = await commentOnThePost(jsonData, userData?._id)
    if (err || !res) throw new Error('Fetch failed')
    const { post } = await res.json()
  }

  return (
    <div className={styles['main-container']}>
      <div className={styles['container']}>
        <span>
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
        <span onClick={() => setOpenComment(!openComment)}>
          <FaRegComment fontSize={20} />
          {/* <p className="text-sm">Comments</p> */}
        </span>
        <span>
          <IoPaperPlaneOutline fontSize={20} />
          {/* <p className="text-sm">Send</p> */}
        </span>
        <span>
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
      {openComment && (
        <div className={styles['comment-container']}>
          <span>
            <Avatar
              isBordered
              radius="full"
              size="sm"
              src={data?.users?.profile_pic}
            />
            <input
              type="text"
              onChange={(e: any) => setInputMessage(e.target.value)}
            />
            <button disabled={inputMessage === ''} onClick={handleCommentBox}>
              Post
            </button>
          </span>
          <div>
            {userData.comments.map((item: any) => (
              <div key={item.userId} className=" ">
                <p>{item?.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostActionButton
