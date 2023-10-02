import { closeModal } from '@/redux/slices/modal'
import { RootState } from '@/redux/store'
import { postUploadImage, updateUserDetails } from '@/services/services'
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
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { data, getData, index } = useSelector(
    (state: RootState) => state.modal
  )
  console.log('🚀 ~ file: index.tsx:17 ~ UploadImage ~ data:', data._id)
  const [inputData, setInputData] = useState<InputData>({
    image_file: null,
    image_url: null,
  })
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    console.log('🚀 ~ file: index.tsx:42 ~ handleFileChange ~ url:', url)
    setInputData((prev) => {
      return { ...prev, image_file: file, image_url: url }
    })
  }
  const handelSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!inputData.image_file) return alert('Please Select Image!')
    if (!allowedTypes.includes(inputData.image_file?.type))
      return alert('Only JPG/PNG/WEBP type is supported!')
    const imageFormData = new FormData()
    imageFormData.append('file', inputData.image_file)
    console.log(
      '🚀 ~ file: index.tsx:46 ~ handelSubmit ~ imageFormData:',
      imageFormData
    )

    const { res: imgRes, err: imgErr } = await postUploadImage(imageFormData)
    if (imgErr || !imgRes || !imgRes.ok) throw new Error('Fetch failed!')
    const { data } = await imgRes.json()
    const { url } = data
    setLoading(false)
    console.log('🚀 ~ file: index.tsx:59 ~ handleSubmit ~ url:', url)

    const json = {
      profile_pic: url,
    }
    const id = data._id
    const { res, err } = await updateUserDetails(json, id)
    if (err || !res) throw new Error('Fetch failed')
    const { user } = await res.json()
    setLoading(false)
    if (getData) {
      getData()
    }
    dispatch(closeModal())
  }
  useEffect(() => {
    if (!data) return
    setInputData((prev) => {
      return { ...prev, image_url: data.profile_pic ?? null }
    })
  }, [data])
  return (
    <>
      <div className=" bg-white p-8 min-w-[700px] min-h-[700px]  rounded-2xl opacity-100 ">
        <h1>Profile Photo </h1>
        <form onSubmit={handelSubmit}>
          <label
            htmlFor="file_upload"
            className="w-full h-60 bg-gray-100 block"
          >
            {inputData.image_file && (
              <Image
                src={inputData.image_url as string}
                width={200}
                height={200}
                alt=""
                quality={100}
              />
            )}
            {/* {data && (
              <Image
                src={inputData.image_url as string}
                width={200}
                height={200}
                alt=""
                quality={100}
              />
            )} */}
            <input
              type="file"
              accept="jpeg ,png,jpg"
              name=""
              id="file_upload"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <button type="submit">Upload </button>
        </form>
      </div>
    </>
  )
}

export default UploadImage
