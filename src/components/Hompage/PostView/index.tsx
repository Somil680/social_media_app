import React from 'react'
import { BsHeartFill } from 'react-icons/bs'
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
import { formatDistanceToNowStrict } from 'date-fns'
import PostActionButton from '@/components/postActionButton'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import styles from './styles.module.css'

const PostView = () => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.feeds
  )
  const { data: userData } = useSelector((state: RootState) => state.allUsers)

  return (
    <>
      <section className={styles['main-container']}>
        {data?.map((item: any, index: any) => {
          const likeArr: string[] = item?.like ? Object.values(item?.like) : []
          const fetchUser = userData?.filter(
            (element: any) => element._id === item.userId
          )
          return (
            <>
              <div className={styles['container']} key={item._id}>
                {/* user name */}
                <div className={styles['user-container']}>
                  {fetchUser?.map((row: any) => (
                    <>
                      <div className="flex gap-5" key={row._id}>
                        <Avatar
                          isBordered
                          radius="full"
                          size="md"
                          src={row?.profile_pic}
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            {row?.first_name}&nbsp;{row.last_name}
                          </h4>
                          <h5 className="text-small tracking-tight text-default-400">
                            @{row?.username}
                          </h5>
                        </div>
                      </div>
                    </>
                  ))}
                </div>

                {/* content image */}
                <div className={styles['content']}>
                  <span className="flex items-end">
                    <p>{item.content}</p>
                  </span>
                  <span className="pt-2 text-default-400">
                    {item.caption}
                    {item.image && (
                      <Image
                        width={500}
                        height={200}
                        alt="NextUI hero Image with delay"
                        src={item?.image}
                      />
                    )}
                  </span>
                  <Divider />
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
                  <Divider />
                </div>

                {/* actiion button */}

                <div className="gap-2">
                  <PostActionButton userData={item} />
                </div>
              </div>
            </>
          )
        })}
      </section>
    </>
  )
}

export default PostView
