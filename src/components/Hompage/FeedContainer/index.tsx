import { RootState } from '@/redux/store'
import { Avatar, Card, CardBody, Divider, Image } from '@nextui-org/react'
import React from 'react'
import { FaBookmark } from 'react-icons/fa'
import { useSelector } from 'react-redux'
// import styles from './styles.module.css'

type Props = {}

const FeedContainer = ({}: Props) => {
  const { data, loading } = useSelector((state: RootState) => state.profile)

  return (
    <>
      <Card className="w-[300px]  h-fit  flex flex-col gap-3 ">
        {[data?.users]?.map((item: any, index) => (
          <>
            <div className="flex flex-col items-center justify-center pb-4">
              <Image
                src={item?.cover_pic}
                alt=""
                width={300}
                height={201}
                className="w-full   "
                radius="sm"
              />

              <Avatar
                radius="full"
                size="lg"
                showFallback
                name={item?.first_name}
                src={item?.profile_pic}
                className="relative top-[-20px]"
              />
              <div className="px-4 items-center text-center">
                <h1 className="text-lg font-extrabold hover:underline cursor-pointer">
                  {item?.first_name} {item?.last_name}
                </h1>
                <p className="text-gray-400 text-sm">{item?.heading}</p>
                <Divider className="my-2" />
                <span className="flex gap-3 items-center">
                  <FaBookmark fill="black" />
                  <p>My items</p>
                </span>
              </div>
            </div>
          </>
        ))}
      </Card>
    </>
  )
}

export default FeedContainer
