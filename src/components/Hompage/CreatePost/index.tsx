' use client;'
import { postUploadImage, sendingPost } from '@/services/services'
import React, { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { FcPicture } from 'react-icons/fc'
import {
  Avatar,
  Button,
  Card,
  Divider,
  Input,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

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
  console.log('🚀 ~ file: index.tsx:37 ~ CreatePost ~ data:', data)
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
      console.log('else working')
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    isOpen: isOpenImage,
    onOpen: onOpenImage,
    onOpenChange: onOpenChangeImage,
  } = useDisclosure()

  return (
    <div>
      <Card className="w-[500px] min-h-20 flex flex-row items-center gap-4 p-3 ">
        <Avatar isBordered src={data?.users?.profile_pic} />
        <Button
          className="w-[430px]  h-12 rounded-3xl border-2 border-gray-300 bg-white text-gray-400   pl-7 flex items-center justify-start "
          onPress={onOpen}
        >
          Start a Post
        </Button>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex  items-center  gap-4">
                <Avatar isBordered src={data?.users?.profile_pic} />
                <h3>{data?.users?.username}</h3>
              </ModalHeader>
              <ModalBody className="border-b-slate-500">
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
              </ModalBody>
              <ModalFooter className="flex justify-between w-full">
                <Button variant="light" onPress={onOpenImage}>
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
                <Button color="primary" onClick={handleSubmit}>
                  {loading ? 'Loading... ' : 'Create'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* <Modal isOpen={isOpenImage} onOpenChange={onOpenChangeImage} size="xl">
        <ModalContent>
          {(onCloseImage) => (
            <>
              <ModalHeader className="flex  items-center  gap-4">
                <h3>Upload Image</h3>
              </ModalHeader>
              <ModalBody>
                {inputData.image_file && (
                  <Image
                    src={inputData?.image_url as string}
                    width={250}
                    height={250}
                    alt=""
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onCloseImage}>
                  {loading ? 'Loading... ' : 'Save'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}
    </div>
  )
}

export default CreatePost
