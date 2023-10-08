'use client'
import React, { useEffect, useState } from 'react'
import { getUserById } from '@/services/services'
import { Avatar, Card, CardBody, Divider, Image } from '@nextui-org/react'
import { formatDistanceToNowStrict } from 'date-fns'
import { GrLocation } from 'react-icons/gr'
import { MdDateRange } from 'react-icons/md'
// import styles from './styles.module.css'

type Props = {}

const UserProfile = ({ params }: { params: { userprofile: string } }) => {
  const [data, setData] = useState([])
  const fetchUser = async () => {
    const { res, err } = await getUserById(params.userprofile)
    if (err || !res || !res.ok) throw new Error('Fetch failed!')
    const { users } = await res.json()
    setData(users)
  }
  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <>
      <div className="mt-[70px]">
        {[data]?.map((item: any, index) => {
          const followingsArr: string[] = item?.followings
            ? Object.values(item?.followings)
            : []

          const followersArr: string[] = item?.followers
            ? Object.values(item?.followers)
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
                  {item.profile_pic ? (
                    <Image
                      src={item?.profile_pic}
                      alt=""
                      isZoomed
                      width={208}
                      height={208}
                    />
                  ) : (
                    <Avatar radius="full" size="lg" src={item?.profile_pic} />
                  )}
                </div>
                <div className=" mt-24 ml-8 gap-2 h-full  flex flex-col py-4">
                  <h1 className="text-3xl font-extrabold">
                    {item?.first_name} {item?.last_name}
                  </h1>
                  <p>{item?.heading} </p>
                  <p className="text-gray-400">{item?.bio}</p>
                  <p className="text-gray-400 flex gap-1 items-center">
                    <GrLocation fill="grey" /> {item?.city} , {item?.state}{' '}
                  </p>
                  <p className="text-gray-400 flex gap-1 items-center">
                    <MdDateRange fill="grey" /> &nbsp;Joined &nbsp;
                    {/* {format(new Date(item?.createdAt), 'MMMM yyyy')} */}
                  </p>

                  <div className="flex gap-4 text-blue-500 font-semibold ">
                    <p>{followingsArr?.length} Followings</p>
                    <p>{followersArr?.length} Followers</p>
                  </div>
                </div>
              </div>

              <div className="w-[1000px]  border rounded-xl mt-4  gap-1 h-full  flex flex-col py-4 px-8 bg-white ">
                <h1 className="text-xl font-medium">Activity</h1>
                <div className="flex w-full flex-col">
                  <Card shadow="none" className="p-0">
                    <CardBody>
                      {item?.posts?.map((row: any) => (
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
                            <div className=" ">
                              {row.image && (
                                <Image
                                  width={200}
                                  height={200}
                                  alt="NextUI hero Image with delay"
                                  src={row?.image}
                                  className="w-28  object-cover"
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
                          <Divider className="my-2" />
                        </div>
                      ))}
                      {/* <div className="flex flex-col mt-4 gap-2 border-2 "></div> */}
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default UserProfile
