import { RootState } from '@/redux/store'
import { Avatar } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'
import { FaBookmark } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'

type Props = {}

const FeedContainer = ({}: Props) => {
  const { data, loading } = useSelector((state: RootState) => state.profile)

  return (
    <>
      <div className={styles['section']}>
        {[data?.users]?.map((item: any, index) => (
          <>
            <div className={styles['container']}>
              <Image
                src={item?.cover_pic}
                alt=""
                width={300}
                height={201}
                className={styles['banner']}
              />

              <Avatar
                radius="full"
                size="lg"
                showFallback
                name={item?.first_name}
                src={item?.profile_pic}
                className="relative top-[-20px]"
              />
              <div className={styles['text-container']}>
                <span className={styles['sub-container']}>
                  <h1>
                    {item?.first_name} {item?.last_name}
                  </h1>
                  <p className="text-gray-400 text-sm">{item?.heading}</p>
                </span>
                <span className={styles['bookmark']}>
                  <FaBookmark fill="black" />
                  <p>My items</p>
                </span>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  )
}

export default FeedContainer
