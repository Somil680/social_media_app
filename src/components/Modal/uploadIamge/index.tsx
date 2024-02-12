import { closeModal } from '@/redux/slices/modal'
import { fetchUserData } from '@/redux/slices/userData'
import { RootState } from '@/redux/store'
import { postUploadImage, updateUserDetails } from '@/services/services'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  CircularProgress,
} from '@nextui-org/react'
import { useSession } from 'next-auth/react'
// import { Button } from '@nextui-org/react'
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import styles from './styles.module.css'

type Props = {}

type InputData = {
  image_file: File | null
  image_url: null | string
}

const UploadImage = ({}: Props) => {
  const dispatch = useDispatch<any>()
  const { data: userSession }: any = useSession()

  const [loading, setLoading] = useState(false)
  const { data } = useSelector((state: RootState) => state.modal)
  const [inputData, setInputData] = useState<InputData>({
    image_file: null,
    image_url: null,
  })
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setInputData((prev) => {
      return { ...prev, image_file: file, image_url: url }
    })
  }
  const handelSubmit = async (e: any) => {
    if (!inputData.image_file) return alert('Please Select Image!')
    setLoading(true)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(inputData.image_file?.type))
      return alert('Only JPG/PNG/WEBP type is supported!')
    const imageFormData = new FormData()
    imageFormData.append('file', inputData.image_file)
    const { res: imgRes, err: imgErr } = await postUploadImage(imageFormData)
    if (imgErr || !imgRes || !imgRes.ok) throw new Error('Fetch failed!')
    const { data } = await imgRes.json()
    const { url } = data
    const json = {
      profile_pic: url,
    }
    const { res, err } = await updateUserDetails(json, userSession?.user?._id)
    if (err || !res) throw new Error('Fetch failed')
    const { user } = await res.json()
    setLoading(false)
    dispatch(fetchUserData(userSession?.user?._id))
    dispatch(closeModal())
  }
  useEffect(() => {
    if (!data) return
    setInputData((prev) => {
      return { ...prev, image_url: data?.users?.profile_pic ?? null }
    })
  }, [data])
  return (
    <>
      <Card className=" bg-white  opacity-100  w-96">
        <CardHeader className="w-fit">
          <h4 className="font-bold text-large">Profile Photo</h4>
        </CardHeader>
        <CardBody>
          <label
            htmlFor="file_upload"
            className="w-fit h-52 bg-gray-100 block cursor-pointer hover:bg-red-700 "
          >
            {inputData.image_file ? (
              <Image
                src={
                  (inputData.image_url as string) || data?.users?.profile_pic
                }
                width={200}
                height={200}
                alt=""
                quality={100}
                className="w-52 h-52"
              />
            ) : (
              <Image
                src={data?.users?.profile_pic as string}
                width={200}
                height={200}
                alt=""
                quality={100}
                className="w-52 h-52"
              />
            )}

            <input
              type="file"
              accept="jpeg ,png,jpg"
              name=""
              id="file_upload"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </CardBody>
        <CardFooter>
          <Button type="submit" color="primary" onClick={handelSubmit}>
            {loading ? (
              <CircularProgress
                aria-label="Loading..."
                size="sm"
                color="primary"
                className="text-white "
              />
            ) : (
              'Upload'
            )}
          </Button>
        </CardFooter>
      </Card>
      {/* <div className=" bg-white p-8 min-w-[700px] min-h-[700px]  rounded-2xl opacity-100 ">
        <h1>Profile Photo </h1>
      </div> */}
    </>
  )
}

export default UploadImage
