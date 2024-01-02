'use client'
import FollowButton from '@/components/followButton'
import { fetchAllUserData } from '@/redux/slices/allUserData'
import { RootState } from '@/redux/store'
import { Image, Card, Link, Skeleton } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import styles from './styles.module.css'

type Props = {}

const Connections = ({}: Props) => {
  const loadSkeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const { data: session }: any = useSession()
  const dispatch = useDispatch<any>()

  const { data, loading, error } = useSelector(
    (state: RootState) => state.allUsers
  )
  const filterData = data?.filter(
    (item: any) => item._id !== session?.user?._id
  )
  useEffect(() => {
    if (!session && data.length > 0) return
    if (data) return
    dispatch(fetchAllUserData(session?.user?._id))
  }, [])
  return (
    <>
      <Card className="mt-[70px] w-[650px]   p-3">
        <p className="py-3">
          People you may know based on your recent activity
        </p>
        <div className="flex flex-row flex-wrap  gap-3">
          {loading ? (
            <>
              {loadSkeleton.map((item: any) => (
                <>
                  <Card
                    className="w-[200px] space-y-5 p-4"
                    radius="lg"
                    key={item}
                  >
                    <Skeleton className="rounded-lg">
                      <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <div className="space-y-3 flex flex-col gap-1">
                      <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                      </Skeleton>
                      <Skeleton className="w-4/5 rounded-lg">
                        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                      </Skeleton>
                      <Skeleton className="w-2/5 rounded-lg">
                        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                      </Skeleton>
                      <Skeleton className="w-full h-10 rounded-lg">
                        <div className="h-5 w-[1700px] rounded-lg bg-default-300"></div>
                      </Skeleton>
                    </div>
                  </Card>
                </>
              ))}
            </>
          ) : (
            <>
              {filterData?.map((item: any, index: any) => (
                <>
                  <Card
                    className="w-[200px]  h-[280px]  gap-3 items-center pb-4 "
                    key={item._id}
                  >
                    <Image
                      src={
                        item?.cover_pic
                          ? item.cover_pic
                          : 'https://res.cloudinary.com/duiavy8qd/image/upload/v1696524914/Connect_Together_Always_rzvapo.png'
                      }
                      alt=""
                      width={300}
                      height={250}
                      className="w-full   "
                      radius="sm"
                    />
                    <div className="relative top-[-45px]  flex flex-col justify-center items-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200  border-2 flex justify-center items-center">
                        <Image
                          src={
                            item?.profile_pic
                              ? item.profile_pic
                              : 'https://res.cloudinary.com/duiavy8qd/image/upload/v1696866315/y2QcxTcchVVdUGZITQpr6z96TXYOV0p3ueLL_1kIPl7s-hHn3-nh8hamBDj0GAUNAndJ9_Yuo2OzYG5Nic_hNicPq37npZ93T5Nk-A_j44ija.avif'
                          }
                          alt=""
                          width={100}
                          height={100}
                          className="object-cover"
                        />
                      </div>
                      <div className="px-4 items-center text-center flex  flex-col justify-between gap-1 w-[200px] h-[150px]">
                        <div>
                          <h1 className="text-lg font-extrabold hover:underline cursor-pointer">
                            {item?.first_name} {item?.last_name}
                          </h1>
                          <p className="text-black text-sm">
                            @{item?.username}
                          </p>
                          <p className="text-gray-400 text-sm line-clamp-2">
                            {item?.heading}
                          </p>
                        </div>
                        <div className="w-full">
                          <FollowButton userData={item} />
                        </div>
                        {/* <Divider className="my-2" /> */}
                        {/* <span className="flex gap-3 items-center"> */}
                        {/* <FaBookmark fill="black" /> */}
                        {/* </span> */}
                      </div>
                    </div>
                  </Card>
                </>
              ))}
            </>
          )}
        </div>
        {/* <Card className="max-w-[500px]  h-fit p-4  flex flex-col gap-3">
          <h2 className="font-semibold">Who to follow</h2>
          {filterData?.map((item: any) => {
            return (
              <>
                <div className="flex w-72 justify-between items-center ">
                  <Link href={`/profile/${item._id}`}>
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          item?.profile_pic
                            ? item.profile_pic
                            : 'https://res.cloudinary.com/duiavy8qd/image/upload/v1696866315/y2QcxTcchVVdUGZITQpr6z96TXYOV0p3ueLL_1kIPl7s-hHn3-nh8hamBDj0GAUNAndJ9_Yuo2OzYG5Nic_hNicPq37npZ93T5Nk-A_j44ija.avif'
                        }
                        alt=""
                        isZoomed
                        width={208}
                        height={208}
                      />
                      <p>{item.username}</p>
                    </div>
                  </Link>
                  <FollowButton userData={item} />
                </div>
              </>
            )
          })}
        </Card> */}
      </Card>
    </>
  )
}

export default Connections
