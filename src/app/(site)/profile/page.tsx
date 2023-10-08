'use client'
import React, { useEffect, useState } from 'react'
import { Avatar, Image } from '@nextui-org/react'
import { GrLocation } from 'react-icons/gr'
import { MdDateRange } from 'react-icons/md'
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Divider,
  Chip,
  Button,
} from '@nextui-org/react'
import { openModal } from '@/redux/slices/modal'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import { format, formatDistanceToNowStrict } from 'date-fns'
import { RootState } from '@/redux/store'
import { fetchUserData } from '@/redux/slices/userData'
import { redirect } from 'next/navigation'

type Props = {}

const Profile = ({}: Props) => {
  const dispatch = useDispatch<any>()
  const { data: session }: any = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/profile/')
    },
  })
  const { data, loading } = useSelector((state: RootState) => state.profile)
  console.log('🚀 ~ file: page.tsx:28 ~ Profile ~ loading:', loading)

  const handleOpenProfile = () => {
    dispatch(
      openModal({
        type: 'profile',
        data: data,
      })
    )
  }
  const handleChangeImage = (types: any) => {
    dispatch(
      openModal({
        type: 'uploadImage',
        data: data,
        index: types,
      })
    )
  }

  useEffect(() => {
    if (data || !session) return
    dispatch(fetchUserData(session?.user?._id))
  }, [data, dispatch, session, session?.user?._id])
  return (
    <div className="mt-[70px]">
      {loading ? (
        'Loading...'
      ) : (
        <>
          {[data?.users]?.map((item: any, index) => {
            const followingsArr: string[] = item?.followings
              ? Object.values(item?.followings)
              : []

            const followersArr: string[] = item?.followers
              ? Object.values(item?.followers)
              : []
            return (
              <div key={index}>
                <div className="w-[1000px]  border rounded-xl mt-6 relative bg-white">
                  <div
                    className="absolute top-52 right-5  
                "
                  >
                    <Button
                      variant="flat"
                      radius="full"
                      onClick={handleOpenProfile}
                    >
                      Edit Profile
                    </Button>
                    {/* <BiSolidEditAlt /> */}
                  </div>
                  <div
                    className="h-[201px] bg-cover object-cover overflow-hidden "
                    onClick={() => handleChangeImage('background_image')}
                  >
                    <Image
                      src={item?.cover_pic}
                      alt=""
                      width={1000}
                      height={201}
                      className="overflow-hidden rounded-t-xl "
                    />
                  </div>
                  <div
                    className="border w-52 h-52 rounded-full ml-8 absolute top-20 bg-white overflow-hidden cursor-pointer "
                    onClick={() => handleChangeImage('profile_image')}
                  >
                    {item.profile_pic ? (
                      <Image
                        src={item?.profile_pic}
                        alt=""
                        isZoomed
                        width={208}
                        height={208}
                      />
                    ) : (
                      <Avatar radius="full" size="md" src={item?.profile_pic} />
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
                    <Tabs aria-label="Options" variant="light">
                      <Tab
                        key="photos"
                        title={
                          <div className="flex items-center space-x-2">
                            <span>Posts</span>
                            <Chip size="sm" variant="faded">
                              {item?.posts?.length}
                            </Chip>
                          </div>
                        }
                      >
                        {/* <Tab key="photos" title={`Posts (${item?.posts?.length})`}> */}
                        <Divider />
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
                                  <div className="border-2">
                                    {row.image && (
                                      <Image
                                        width={100}
                                        height={100}
                                        alt="NextUI hero Image with delay"
                                        src={row?.image}
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
                      </Tab>
                      <Tab
                        key="Saved"
                        title={
                          <div className="flex items-center space-x-2">
                            <span>Saved</span>
                            <Chip size="sm" variant="faded">
                              {item?.bookmark?.length}
                            </Chip>
                          </div>
                        }
                      >
                        <Card shadow="none">
                          <CardBody>
                            {item?.bookmark?.map((row: any) => (
                              <div
                                key={row._id}
                                className="w-full h-full object-cover overflow-hidden  "
                              >
                                <p className="text-default-400 text-[12px]">
                                  {' '}
                                  {item?.first_name} {item?.last_name} &nbsp;
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
                                  <div>
                                    {row.image && (
                                      <Image
                                        width={100}
                                        height={100}
                                        alt="NextUI hero Image with delay"
                                        src={row?.image}
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
                          </CardBody>
                        </Card>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

export default Profile
