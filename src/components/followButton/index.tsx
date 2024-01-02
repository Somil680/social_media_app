import { fetchUserData } from '@/redux/slices/userData'
import { RootState } from '@/redux/store'
import { putFollowTheUser, putUnFollowTheUser } from '@/services/services'
import { Button } from '@nextui-org/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import styles from './styles.module.css'

type Props = {
  userData: any | null
}
const FollowButton = ({ userData }: Props) => {
  const { data } = useSelector((state: RootState) => state.profile)
  const dispatch = useDispatch<any>()
  const [isFollowed, setIsFollowed] = useState(false)

  const handleOnClick = async () => {
    const jsonData = {
      userId: userData._id,
    }
    if (!following) {
      const { res, err } = await putFollowTheUser(jsonData, data?.users?._id)
      if (err || !res || !res.ok) throw new Error('Fetch failed!')
      const { message } = await res.json()
    } else {
      const { res, err } = await putUnFollowTheUser(jsonData, data?.users?._id)
      if (err || !res || !res.ok) throw new Error('Fetch failed!')
      const { message } = await res.json()
    }
    dispatch(fetchUserData(data?.users?._id))
  }

  const following = data?.users?.followings.includes(userData._id)

  return (
    <>
      <Button
        color="primary"
        variant={following || isFollowed ? 'bordered' : 'solid'}
        onClick={handleOnClick}
        onPress={() => setIsFollowed(!isFollowed)}
        fullWidth
      >
        {following || isFollowed ? 'Unfollow' : 'Follow'}
      </Button>
    </>
  )
}

export default FollowButton
