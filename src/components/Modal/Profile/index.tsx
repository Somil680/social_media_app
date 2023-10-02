import { closeModal } from '@/redux/slices/modal'
import { RootState } from '@/redux/store'
import { updateUserDetails } from '@/services/services'
import { format } from 'date-fns'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import styles from './styles.module.css'

type Props = {}

const ProfileModal = ({}: Props) => {
  const dispatch = useDispatch()
  const { data, getData } = useSelector((state: RootState) => state.modal)
  const [inputData, setInputData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    username: '',
    heading: '',
    bio: '',
    country: '',
    state: '',
    city: '',
  })
  const [loading, setLoading] = useState(false)
  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: any) => {
    setLoading(true)
    e.preventDefault()
    console.log(
      '🚀 ~ file: index.tsx:27 ~ handleSubmit ~ inputData:',
      inputData
    )
    const { res, err } = await updateUserDetails(inputData, data._id)
    if (err || !res) throw new Error('Fetch failed')
    const { user } = await res.json()
    setLoading(false)
    if (getData) {
      getData()
    }
    dispatch(closeModal())

    console.log('🚀 ~ file: index.tsx:40 ~ handleSubmit ~ user:', user)
  }
  useEffect(() => {
    if (!data) return
    setInputData((prev) => {
      return {
        ...prev,
        first_name: data.first_name,
        last_name: data.last_name,
        date_of_birth: format(new Date(data.date_of_birth), 'dd/MM/yyyy'),
        username: data.username,
        heading: data.heading,
        bio: data.bio,
        country: data.country,
        state: data.state,
        city: data.city,
      }
    })
  }, [])

  return (
    <div className=" bg-white p-8 min-w-[700px] min-h-[700px]  rounded-2xl opacity-100 ">
      <h1>Edit Profile</h1>

      <form className="w-[100%]" action="#" onSubmit={handleSubmit}>
        <div className="flex w-full gap-5">
          <div className="w-full">
            <p className=" text-[16px] md:text-[16px] font-normal mb-1 mt-3">
              First Name
            </p>
            <input
              type="text"
              className="w-full h-[49px] border-[1px] border-paragraph/50 outline-none p-4 text-[14px] focus:border focus:border-purple focus:ring-purple"
              required
              name="first_name"
              value={inputData.first_name}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(event)
              }
            />
          </div>
          <div className="w-full">
            <p className=" text-[16px] md:text-[16px] font-normal mb-1 mt-3">
              Last Name
            </p>
            <input
              type="text"
              className="w-full h-[49px] border-[1px] border-paragraph/50 outline-none p-4 text-[14px] focus:border focus:border-purple focus:ring-purple"
              required
              name="last_name"
              value={inputData.last_name}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(event)
              }
            />
          </div>
        </div>
        <div className="flex w-full gap-5">
          <div className="w-full">
            <p className=" text-[16px] md:text-[16px] font-normal mb-1 mt-3">
              Username{' '}
            </p>
            <input
              type="text"
              className="w-full h-[49px] border-[1px] border-paragraph/50 outline-none p-4 text-[14px] focus:border focus:border-purple focus:ring-purple"
              required
              name="username"
              value={inputData.username}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(event)
              }
            />
          </div>
          <div className="w-full">
            <p className=" text-[16px] md:text-[16px] font-normal mb-1 mt-3">
              Date of Birth
            </p>
            <input
              type="date"
              className="w-full h-[49px] border-[1px] border-paragraph/50 outline-none p-4 text-[14px] focus:border focus:border-purple focus:ring-purple"
              required
              name="date_of_birth"
              value={inputData.date_of_birth}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(event)
              }
            />
          </div>
        </div>

        <p className=" text-[16px] md:text-[16px] font-normal mb-1 mt-3">
          Heading
        </p>
        <input
          type="text"
          className="w-full h-[49px] border-[1px] border-paragraph/50 outline-none p-4 text-[14px] focus:border focus:border-purple focus:ring-purple"
          required
          name="heading"
          value={inputData.heading}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(event)
          }
        />
        <p className=" text-[16px] md:text-[16px] font-normal mb-1 mt-3">Bio</p>
        <input
          type="text"
          className="w-full h-[49px] border-[1px] border-paragraph/50 outline-none p-4 text-[14px] focus:border focus:border-purple focus:ring-purple"
          required
          name="bio"
          value={inputData.bio}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(event)
          }
        />
        <div className="flex w-full gap-5">
          <div className="w-full">
            <p className=" text-[16px] md:text-[16px] font-normal mb-1 mt-3">
              City{' '}
            </p>
            <input
              type="text"
              className="w-full h-[49px] border-[1px] border-paragraph/50 outline-none p-4 text-[14px] focus:border focus:border-purple focus:ring-purple"
              required
              name="city"
              value={inputData.city}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(event)
              }
            />
          </div>
          <div className="w-full">
            <p className=" text-[16px] md:text-[16px] font-normal mb-1 mt-3">
              State
            </p>
            <input
              type="text"
              className="w-full h-[49px] border-[1px] border-paragraph/50 outline-none p-4 text-[14px] focus:border focus:border-purple focus:ring-purple"
              required
              name="state"
              value={inputData.state}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(event)
              }
            />
          </div>
        </div>

        <p className=" text-[16px] md:text-[16px] font-normal mb-1 mt-3">
          Country
        </p>
        <input
          type="text"
          className="w-full h-[49px] border-[1px] border-paragraph/50 outline-none p-4 text-[14px] focus:border focus:border-purple focus:ring-purple"
          required
          name="country"
          value={inputData.country}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(event)
          }
        />

        <div className="w-full md:w-fit flex items-center justify-center">
          <button
            type="submit"
            className="flex justify-center items-center w-32 h-10  text-white bg-blue-500 rounded mt-7"
          >
            {loading ? 'Processing..' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProfileModal
