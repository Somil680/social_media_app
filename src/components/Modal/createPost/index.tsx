import { RootState } from '@/redux/store'
import { postUploadImage, sendingPost } from '@/services/services'
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Textarea,
  Image,
} from '@nextui-org/react'
import React, { ChangeEvent, useState } from 'react'
import { FcPicture } from 'react-icons/fc'
import { useSelector } from 'react-redux'
// import styles from './styles.module.css'

type Props = {}
type InputData = {
  content: string
  caption: string
  user: string
  postId: string
  image_file: File | null
  image_url: null | string
}
const CreatePost = ({}: Props) => {
  const { data } = useSelector((state: RootState) => state.profile)
  const [loading, setLoading] = useState(false)
  const [inputData, setInputData] = useState<InputData>({
    content: '',
    caption: '',
    user: '',
    postId: '',
    image_file: null,
    image_url: null,
  })
  const clearData = () => {
    setInputData((prev) => {
      return {
        ...prev,
        content: '',
        caption: '',
        user: '',
        postId: '',
        image_file: null,
        image_url: null,
      }
    })
  }
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setInputData((prev) => {
      return { ...prev, image_file: file, image_url: url }
    })
  }

  const handleSubmit = async () => {
    if (inputData.image_file) {
      setLoading(true)
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
      if (!inputData.image_file) return alert('Please Select Image!')
      if (!allowedTypes.includes(inputData.image_file?.type))
        return alert('Only JPG/PNG/WEBP type is supported!')
      const imageFormData = new FormData()
      imageFormData.append('file', inputData.image_file)

      const { res: imgRes, err: imgErr } = await postUploadImage(imageFormData)
      if (imgErr || !imgRes || !imgRes.ok) throw new Error('Fetch failed!')
      const { data } = await imgRes.json()
      const { url } = data
      const jsonData = {
        postId: data?.users?._id,
        content: inputData.content,
        caption: inputData.caption,
        image: url,
        userId: data?.users?._id,
      }
      const { res, err } = await sendingPost(jsonData)
      if (err || !res) throw new Error('Fetch failed')
      const { post } = await res.json()
      setLoading(false)
    } else {
      setLoading(true)
      const jsonData = {
        postId: data?.users?._id,
        content: inputData.content,
        caption: inputData.caption,
        userId: data?.users?._id,
      }
      const { res, err } = await sendingPost(jsonData)
      if (err || !res) throw new Error('Fetch failed')
      const { post } = await res.json()
      setLoading(false)
    }
    clearData()
  }
  return (
    <>
      <Card className="w-[500px]">
        <CardHeader className="flex  items-center  gap-4 w-fit">
          <Avatar isBordered src={data?.users?.profile_pic} />
          <div className="flex flex-col">
            <h1>
              {data?.users?.first_name} {data?.users?.last_name}
              <h3 className="text-default-400 font-semibold text-sm">
                @{data?.users?.username}
              </h3>
            </h1>
          </div>
        </CardHeader>
        <CardBody className="pt-0">
          <Textarea
            labelPlacement="outside"
            variant="underlined"
            fullWidth
            placeholder="What do you want to talk about?"
            className="border-none"
            onChange={(e) =>
              setInputData((prev): any => {
                return { ...prev, content: e.target.value }
              })
            }
          />
          {inputData.image_file && (
            <Image
              src={inputData?.image_url as string}
              width={525}
              height={100}
              alt=""
              className="rounded-xl"
            />
          )}
          <Divider className="" />
        </CardBody>
        <CardFooter className="flex justify-between w-full">
          <Button variant="light">
            <label htmlFor="upload-file">
              <FcPicture fontSize={50} />
            </label>
          </Button>
          <input
            type="file"
            name=""
            accept="/image"
            id="upload-file"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button onClick={handleSubmit} disabled={true}>
            {loading ? 'Loading... ' : 'Create'}
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default CreatePost
