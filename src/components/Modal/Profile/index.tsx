import { closeModal } from '@/redux/slices/modal'
import { fetchUserData } from '@/redux/slices/userData'
import { RootState } from '@/redux/store'
import { updateUserDetails } from '@/services/services'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
} from '@nextui-org/react'
import { format, isValid, parseISO } from 'date-fns'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import styles from './styles.module.css'

type Props = {}

const ProfileModal = ({}: Props) => {
  const dispatch = useDispatch<any>()
  const { data } = useSelector((state: RootState) => state.modal)
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
    const { res, err } = await updateUserDetails(inputData, data?.users?._id)
    if (err || !res) throw new Error('Fetch failed')
    const { user } = await res.json()
    setLoading(false)
    dispatch(fetchUserData(data?.users?._id))
    dispatch(closeModal())
  }
  useEffect(() => {
    if (!data) return
    const dateOfBirth = parseISO(data?.users?.date_of_birth)
    let formattedDateOfBirth: any
    if (isValid(dateOfBirth)) {
      formattedDateOfBirth = format(dateOfBirth, 'yyyy/MM/dd')
      // Use formattedDateOfBirth as needed
    } else {
      // Handle the case where data.date_of_birth is not a valid date
      console.error('Invalid date_of_birth:', data?.users?.date_of_birth)
      // You can set a default value or show an error message here
    }
    setInputData((prev) => {
      return {
        ...prev,
        first_name: data?.users?.first_name,
        last_name: data?.users?.last_name,
        date_of_birth: formattedDateOfBirth,
        username: data?.users?.username,
        heading: data?.users?.heading,
        bio: data?.users?.bio,
        country: data?.users?.country,
        state: data?.users?.state,
        city: data?.users?.city,
      }
    })
  }, [])

  return (
    <Card className=" bg-white  opacity-100 ">
      <CardHeader className="w-fit">
        <h4 className="font-bold text-large">Edit</h4>
      </CardHeader>
      <CardBody>
        <form className="w-[100%]" action="#" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full gap-5">
            <div className="flex gap-5">
              <Input
                label="First Name"
                variant="bordered"
                labelPlacement={'outside'}
                placeholder="Enter your name"
                type="text"
                required
                name="first_name"
                value={inputData.first_name}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event)
                }
              />
              <Input
                label="Last Name"
                variant="bordered"
                labelPlacement={'outside'}
                placeholder="Enter your surname"
                type="text"
                required
                name="last_name"
                value={inputData.last_name}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event)
                }
              />
            </div>
            <div className="flex gap-5">
              <Input
                label="Username"
                variant="bordered"
                labelPlacement={'outside'}
                placeholder="Enter your username"
                type="text"
                required
                name="username"
                value={inputData.username}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event)
                }
              />
              <Input
                label="Date of Birth"
                variant="bordered"
                labelPlacement={'outside'}
                placeholder="Enter your Dob"
                type="date"
                required
                name="date_of_birth"
                value={inputData.date_of_birth}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event)
                }
              />
            </div>
            <div className="flex  flex-col gap-5">
              <Textarea
                label="Heading"
                variant="bordered"
                labelPlacement={'outside'}
                placeholder="Type..."
                type="text"
                required
                name="heading"
                value={inputData.heading}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event)
                }
              />
              <Textarea
                label="Bio"
                variant="bordered"
                labelPlacement={'outside'}
                placeholder="Type.."
                type="text"
                required
                name="bio"
                value={inputData.bio}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event)
                }
              />
            </div>
            <div className="flex gap-5">
              <Input
                label="City"
                variant="bordered"
                labelPlacement={'outside'}
                placeholder="Enter your city"
                type="text"
                required
                name="city"
                value={inputData.city}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event)
                }
              />
              <Input
                label="State"
                variant="bordered"
                labelPlacement={'outside'}
                placeholder="Enter your state"
                type="text"
                required
                name="state"
                value={inputData.state}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event)
                }
              />
            </div>
            <Input
              label="Country"
              variant="bordered"
              labelPlacement={'outside'}
              placeholder="Enter your country"
              type="text"
              required
              name="country"
              value={inputData.country}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(event)
              }
            />
          </div>

          <div className="w-full md:w-fit flex items-center justify-center">
            <Button
              type="submit"
              className="flex justify-center items-center w-32 h-10  text-white bg-blue-500 rounded mt-7"
            >
              {loading ? 'Processing..' : 'Submit'}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}

export default ProfileModal
