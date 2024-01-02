'use client'
import React, { useEffect, useState } from 'react'
import { getUserById } from '@/services/services'
import { Avatar, Card, CardBody, Divider, Image, Link } from '@nextui-org/react'
import { formatDistanceToNowStrict } from 'date-fns'
import format from 'date-fns/format'

import { GrLocation } from 'react-icons/gr'
import { MdDateRange } from 'react-icons/md'
// import styles from './styles.module.css'

type Props = {}

const UserProfile = ({ params }: { params: { userprofile: string } }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const fetchUser = async () => {
    setLoading(true)
    const { res, err } = await getUserById(params.userprofile)
    if (err || !res || !res.ok) throw new Error('Fetch failed!')
    const { users } = await res.json()
    setData(users)
    setLoading(false)
  }
  useEffect(() => {
    if (!params) return
    fetchUser()
  }, [])
  return (
    <>
      <div className="mt-[70px]">
        {loading ? (
          <div className=" animate-pulse">
            <div className="w-[1000px]  border rounded-xl mt-6 relative  bg-slate-200">
              <div className="h-[201px] bg-cover object-cover overflow-hidden bg-slate-300 "></div>
              <div className="border w-52 h-52 rounded-full ml-8 absolute top-20 overflow-hidden cursor-pointer bg-slate-400 "></div>
              <div className=" mt-24 ml-8 gap-2 h-full  flex flex-col py-4">
                <div className="h-4 bg-slate-400 rounded col-span-2 w-60"></div>
                <div className="h-4 bg-slate-300 rounded col-span-2 w-72"></div>
                <div className="h-4 bg-slate-400 rounded col-span-2 w-72"></div>
                <div className="h-4 bg-slate-300 rounded col-span-2 w-52"></div>
              </div>
            </div>
            <div className="w-[1000px]  h-40 border rounded-xl mt-3 relative  bg-slate-200  gap-2 flex flex-col pl-8 py-4">
              <div className="h-4 bg-slate-300 rounded col-span-2 w-52"></div>
            </div>
          </div>
        ) : (
          <>
            {[data]?.map((item: any, index) => {
              const followingsArr: string[] = item?.followings
                ? Object.values(item?.followings)
                : []

              const followersArr: string[] = item?.followers
                ? Object.values(item?.followers)
                : []
              const postArr: string[] = item?.posts
                ? Object.values(item?.posts)
                : []
              return (
                <div key={item._id}>
                  <div className="w-[1000px]  border rounded-xl mt-6 relative bg-white">
                    <div className="h-[201px] bg-cover object-cover overflow-hidden ">
                      <Image
                        src={item?.cover_pic}
                        alt=""
                        width={1000}
                        height={201}
                        className="overflow-hidden rounded-t-xl "
                      />
                    </div>
                    <div className="border w-52 h-52 rounded-full ml-8 absolute top-20 bg-white overflow-hidden cursor-pointer ">
                      <Image
                        src={item?.profile_pic}
                        alt=""
                        isZoomed
                        width={208}
                        height={208}
                        className="object-cover h-52 "
                      />
                    </div>
                    <div className=" mt-24 ml-8 gap-2 h-full  flex flex-col py-4">
                      <h1 className="text-3xl font-extrabold">
                        {item?.first_name} {item?.last_name}
                      </h1>
                      <h1 className="text-2xl font-bold">@{item?.username}</h1>
                      <p>{item?.heading} </p>
                      <p className="text-gray-400">{item?.bio}</p>
                      <p className="text-gray-400 flex gap-1 items-center">
                        <GrLocation fill="grey" /> {item?.city} , {item?.state}{' '}
                      </p>
                      <p className="text-gray-400 flex gap-1 items-center">
                        <MdDateRange fill="grey" /> &nbsp;Joined &nbsp;
                        {/* {format(new Date(item?.createdAt), 'MM/dd/yyyy')} */}
                      </p>

                      <div className="flex gap-4 text-blue-500 font-semibold ">
                        <p>{followingsArr?.length} Followings</p>
                        <p>{followersArr?.length} Followers</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-[1000px]  border rounded-xl mt-4  gap-1 h-full  flex flex-col py-4 px-8 bg-white ">
                    <h1 className="text-xl font-medium">Activity</h1>
                    <p className=" text-blue-500 font-semibold">
                      {' '}
                      {item?.posts?.length}&nbsp;Posts
                    </p>
                    <div className="flex w-full flex-col">
                      <Card shadow="none" className="p-0">
                        <CardBody className="px-0">
                          {item?.posts?.map((row: any) => (
                            <>
                              <Link className="text-black hover:bg-slate-100 rounded-xl cursor-pointer">
                                <div
                                  key={row._id}
                                  className="w-full h-full object-cover overflow-hidden  "
                                >
                                  <p className="text-default-400 text-[12px]">
                                    {' '}
                                    {item?.username} &nbsp;
                                    <span>
                                      posted this .{' '}
                                      {formatDistanceToNowStrict(
                                        new Date(item?.createdAt),
                                        {
                                          addSuffix: true,
                                        }
                                      )}{' '}
                                    </span>
                                  </p>
                                  <div className="flex gap-3 ">
                                    <div className="w-28 h-20 flex-shrink-0">
                                      {row.image && (
                                        <Image
                                          width={200}
                                          height={200}
                                          alt="NextUI hero Image with delay"
                                          src={row?.image}
                                          className="w-28 h-20  object-cover"
                                        />
                                      )}
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">
                                        {row.caption}
                                      </p>
                                      <p className="line-clamp-2 text-sm">
                                        {row.content}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                              <Divider className="my-2" />
                            </>
                          ))}
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>
    </>
  )
}

export default UserProfile
