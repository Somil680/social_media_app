'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { BiSolidEditAlt } from 'react-icons/bi'

import banner from '@/assets/images/banner.jpg'
import footer from '@/assets/images/footer_logo.png'
import post from '@/assets/images/post.png.png'
import { openModal } from '@/redux/slices/modal'
import { useDispatch } from 'react-redux'
import { useSession } from 'next-auth/react'
import { getAllPost, getUserById } from '@/services/services'

type Props = {}

const Profile = ({}: Props) => {
  const dispatch = useDispatch()
  const { data: session }: any = useSession()
  const [data, setData] = useState([])
  const [postData, setPostData] = useState([])
  // console.log('🚀 ~ file: page.tsx:21 ~ Profile ~ postData:', postData)

  const fetchUser = async () => {
    const id = session?.user?._id
    const { res, err } = await getUserById(id)
    if (!res || err) throw new Error('fetch Failed')
    const { users } = await res.json()
    setData(users)
  }

  const fetchAllPosts = async () => {
    const { res, err }: any = await getAllPost()
    if (err || !res || !res.ok) throw new Error('Fetch failed!')
    const { posts } = await res.json()
    setPostData(posts)
  }

  const handleOpenProfile = () => {
    dispatch(
      openModal({
        type: 'profile',
        data: data,
        getData: fetchUser,
      })
    )
  }
  const handleChangeImage = (types: any) => {
    dispatch(
      openModal({
        type: 'uploadImage',
        data: data,
        index: types,
        getData: fetchUser,
      })
    )
  }

  useEffect(() => {
    if (session === undefined) return
    fetchUser()
    fetchAllPosts()
  }, [session])

  return (
    <div>
      {[data]?.map((item: any, index) => {
        // const userPost = Array.isArray(data)
        //   ? [data].filter((item: any) => postData.includes(item?._id))
        //   : []
        return (
          <div key={index}>
            <div className="w-[1000px]  border rounded-xl mt-6 relative bg-white">
              <div
                className="absolute top-52 right-5  text-xsl p-2 hover:bg-gray-200 hover:rounded-full"
                onClick={handleOpenProfile}
              >
                <BiSolidEditAlt />
              </div>
              <div
                className="h-[201px] bg-cover object-cover overflow-hidden border"
                onClick={() => handleChangeImage('background_image')}
              >
                <Image src={banner} alt="" width={1000} height={201} />
              </div>
              <div
                className="border w-52 h-52 rounded-full ml-8 absolute top-20 bg-white overflow-hidden"
                onClick={() => handleChangeImage('profile_image')}
              >
                <Image
                  src={item?.profile_pic}
                  alt=""
                  width={200}
                  height={200}
                />
              </div>
              <div className=" mt-24 ml-8 gap-2 h-full  flex flex-col py-4">
                <h1 className="text-3xl">
                  {item?.first_name} {item?.last_name}
                </h1>
                <p>{item?.heading} </p>
                <p className="text-gray-400">{item?.bio}</p>
                <p className="text-gray-400">
                  {item?.city} , {item?.state}{' '}
                </p>
                <div className="flex gap-4 text-blue-600 ">
                  <p>{[item?.followers].length} Followers</p>
                  <p>{[item?.followings].length} Connections</p>
                </div>
              </div>
            </div>
            <div className="w-[1000px]  border rounded-xl mt-4  gap-1 h-full  flex flex-col py-4 px-8 bg-white ">
              <h1 className="text-xl font-medium">Activity</h1>
              <p className="text-blue-600 text-sm font-medium">
                {item?.posts?.length} Posts
              </p>
              <div className="flex flex-col mt-4 gap-2 ">
                {item?.posts?.map((row: any) => (
                  <div
                    key={row._id}
                    className="w-full h-full object-cover overflow-hidden border-b-2 p-2"
                  >
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">{row.caption}</p>
                      <p className="text-xs text-gray-400 ">
                        {' '}
                        UI/UX Designer @Github
                      </p>
                    </div>
                    <p className="line-clamp-2 text-sm">{row.content}</p>
                  </div>
                ))}
                {/* <div className="w-40 h-40 object-cover overflow-hidden">
                  <Image src={post} alt="" width={150} height={150} />
                </div>
                <div className="w-40 h-40 object-cover overflow-hidden">
                  <Image src={post} alt="" width={150} height={150} />
                </div>
                <div className="w-40 h-40 object-cover overflow-hidden">
                  <Image src={post} alt="" width={150} height={150} />
                </div> */}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Profile
