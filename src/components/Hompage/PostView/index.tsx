' use client;'
import React, { useEffect, useState } from 'react'
// import styles from './styles.module.css'
import { BsThreeDots, BsHeartFill } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'
import { IoPaperPlaneOutline } from 'react-icons/io5'
import LikeButton from '../LikeButton/index.'
import BookmarkButton from '../BookmarkButton'
import { getAllPost } from '../../../services/services'
import Image from 'next/image'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Divider,
} from '@nextui-org/react'
import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns'
import PostActionButton from '@/components/postActionButton'

const PostView = () => {
  const [data, setData] = useState([])
  const fetchAllPosts = async () => {
    const { res, err }: any = await getAllPost()
    if (err || !res || !res.ok) throw new Error('Fetch failed!')
    const { posts } = await res.json()
    setData(posts)
  }
  useEffect(() => {
    fetchAllPosts()
  }, [])
  const [isFollowed, setIsFollowed] = React.useState(false)

  const [seeMore, setSeeMore] = useState(false)
  const handleSeeMore = () => {}
  // ============================================================================================================================================================================
  return (
    <>
      <section className="w-full h-full  flex flex-col items-center gap-y-3 ">
        {data.map((item: any, index) => {
          const likeArr: string[] = item?.like ? Object.values(item?.like) : []

          return (
            <>
              <Card className="w-[500px]" key={item._id}>
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src={item?.profile_pic}
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600">
                        @{item?.username}
                      </h4>
                      <h5 className="text-small tracking-tight text-default-400">
                        @zoeylang
                      </h5>
                    </div>
                  </div>

                  {/* <Button
                  className={
                    isFollowed
                      ? 'bg-transparent text-foreground border-default-200'
                      : ''
                  }
                  color="primary"
                  radius="full"
                  size="sm"
                  variant={isFollowed ? 'bordered' : 'solid'}
                  onPress={() => setIsFollowed(!isFollowed)}
                >
                  {isFollowed ? 'Unfollow' : 'Follow'}
                </Button> */}
                </CardHeader>
                <CardBody className="px-3 py-0 text-small  overscroll-none  overscroll-y-none overflow-y-hidden">
                  <div className="flex items-end">
                    <p
                      className={`${
                        seeMore ? 'line-clamp-none' : 'line-clamp-3'
                      }`}
                    >
                      {item.content}
                    </p>
                    {/* <span onClick={() => setSeeMore(true)} className="text-xs">
                    see more.
                  </span> */}
                  </div>
                  <span className="pt-2 text-default-400">
                    {item.caption}
                    <span className="py-2" aria-label="computer" role="img">
                      💻
                    </span>
                    {item.image && (
                      <Image
                        width={500}
                        height={200}
                        alt="NextUI hero Image with delay"
                        src={item?.image}
                      />
                    )}
                  </span>
                  <Divider className="mt-4 mb-1" />
                  <div className="flex gap-1 items-center justify-between px-1">
                    <span className="flex gap-1 items-center ">
                      <p className=" text-default-400 text-small">
                        <BsHeartFill />
                      </p>
                      <p className="font-semibold text-default-400 text-small">
                        {likeArr.length}
                      </p>
                    </span>
                    <div>
                      <p className="text-small tracking-tight text-default-400">
                        {formatDistanceToNowStrict(new Date(item?.createdAt), {
                          addSuffix: true,
                        })}{' '}
                      </p>
                    </div>
                  </div>

                  <Divider className="mt-1" />
                </CardBody>
                <CardFooter className="gap-2">
                  <PostActionButton userData={item} getData={fetchAllPosts} />
                </CardFooter>
              </Card>

              {/* User information  */}
              {/* <div className="flex justify-between ">
              <div className="flex gap-3">
                <Image
                  src={item.image_URL}
                  alt=""
                  width={100}
                  height={100}
                  className="w-10 h-10 rounded-full"
                />
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
            user post content
            <div>
              <p className="line-clamp-2 text-sm">{item.content}</p>
              <p className="text-gray-400 hover:underline">more</p>
            </div>
            user post Image
            <div className="w-full h-full  rounded items-center flex justify-center overflow-hidden">
              <Image
                alt="post"
                src={item.image_URL}
                width={1000}
                height={1000}
              />
            </div>
            like comment  share icon 
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
            likes container 
          */}

              {/* */}
            </>
          )
        })}
      </section>
    </>
  )
}

export default PostView
