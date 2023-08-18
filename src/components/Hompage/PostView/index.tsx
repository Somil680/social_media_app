'use client'
import React, { useEffect, useState } from 'react'
// import styles from './styles.module.css'
import { BsThreeDots, BsHeartFill } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'
import { IoPaperPlaneOutline } from 'react-icons/io5'
import post from '@/assets/images/post.png.png'
import Image from 'next/image'
import LikeButton from '../LikeButton/index.'
import BookmarkButton from '../BookmarkButton'
import { getAllPost } from '../../../services/services'
// ======================================================
const posts = [
  {
    _id: 121,
    content:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores ',
    image_URL: post,
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: 'adarshbalika',
    // createdAt: formatDate(),
    // updatedAt: formatDate(),
  },
  {
    _id: 212,
    content:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et.',
    image_URL: post,

    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: 'adarshbalak',
    // createdAt: formatDate(),
    // updatedAt: formatDate(),
  },
]
// =======================================================
const PostView = () => {
  const [data, setData] = useState([])
  const fetchAllPosts = async () => {
    const { res, err }: any = await getAllPost()
    if (err || !res || !res.ok) throw new Error('Fetch failed!')
    const { posts } = await res.json()
    setData(posts)
    console.log('🚀 ~ file: index.tsx:57 ~ fetchAllPosts ~ json:', data)
  }
  useEffect(() => {
    fetchAllPosts()
  }, [])
  // ============================================================================================================================================================================
  return (
    <>
      <section className="w-full h-full  flex flex-col items-center gap-y-6 ">
        {data.map((item: any, index) => (
          <div
            className="p-8 flex flex-col gap-y-3 bg-white w-[500px] "
            key={index}
          >
            {/* User information  */}
            <div className="flex justify-between ">
              <div className="flex gap-3">
                {/* <Image
                  src={item.image_URL}
                  alt=""
                  width={100}
                  height={100}
                  className="w-10 h-10 rounded-full"
                /> */}
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{item.caption}</p>
                  <p className="text-xs text-gray-400 ">
                    {' '}
                    UI/UX Designer @Github
                  </p>
                </div>
              </div>
              <div className="text-2xl ">
                <BsThreeDots />
              </div>
            </div>
            {/* user post content */}
            <div>
              <p className="line-clamp-2 text-sm">{item.content}</p>
              <p className="text-gray-400 hover:underline">more</p>
            </div>
            {/* user post Image */}
            <div className="w-full h-full  rounded items-center flex justify-center overflow-hidden">
              {/* <Image
                alt="post"
                src={item.image_URL}
                width={1000}
                height={1000}
              /> */}
            </div>
            {/* like comment  share icon  */}
            <div className="flex justify-between w-full">
              <div className="text-3xl flex gap-10">
                <LikeButton item={item} />
                <FaRegComment />
                <IoPaperPlaneOutline />
              </div>
              <div className="text-3xl">
                <BookmarkButton item={item} />
              </div>
            </div>
            <hr />
            {/* likes container  */}

            <p className="flex items-center gap-2 text-sm">
              <BsHeartFill fill="red" />
              Liked by and others
            </p>
          </div>
        ))}
      </section>
    </>
  )
}

export default PostView

{
  /* <div className='flex justify-between w-full'>
    <User
        src={item.image_URL}
        name=""
        className='pl-0'
    />
    <Input
        width='100%'
        clearable
        color='warning'
        contentRightStyling={false}
        placeholder="Type your message..."
        contentRight={
            <SendButton>
                <SendIcon filled={undefined} size={undefined} height={undefined} width={undefined} label={undefined} className={undefined}  />
            </SendButton>
        }
    />
</div> */
}
