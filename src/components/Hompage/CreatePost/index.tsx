'use client'
import { sendingPost } from '@/services/services'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
// import styles from './styles.module.css'

type Props = {}

const CreatePost = ({}: Props) => {
  const [openEditor, setEditor] = useState(false)
  const [loading, setLoading] = useState(false)
  const [inputData, setInputData] = useState({
    content: '',
    caption: '',
    user: '',
    postId: '',
  })
  const { data: session }: any = useSession()

  const handleSubmit = async () => {
    const jsonData = {
      postId: session?.user?._id,
      content: inputData.content,
      caption: inputData.caption,
      user: session?.user?._id,
    }
    console.log('🚀 ~ file: index.tsx:21 ~ handleSubmit ~ jsonData:', jsonData)
    const { res, err } = await sendingPost(jsonData)
    setLoading(true)
    if (err || !res) throw new Error('Fetch failed')
    const { post } = await res.json()
    setLoading(false)
    setEditor(false)
    setInputData({
      content: '',
      caption: '',
      user: '',
      postId: '',
    })
  }

  return (
    <div>
      {openEditor ? (
        <div className="border-2 w-[500px] min-h-20 flex flex-col gap-4  px-3 py-3 bg-white rounded-xl ">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-gray-300 "></div>
            <h3>{session?.user?.username}</h3>
          </div>
          <div>
            <textarea
              name=""
              id=""
              placeholder="What do you want to talk about?"
              className="w-full focus:border-gray-200 border-2 rounded-lg p-2"
              onChange={(e) =>
                setInputData((prev): any => {
                  return { ...prev, content: e.target.value }
                })
              }
            ></textarea>
            <input
              name=""
              id=""
              placeholder="Write caption here?"
              className="w-full focus:border-gray-200 border-2 rounded-lg p-2"
              onChange={(e) =>
                setInputData((prev): any => {
                  return { ...prev, caption: e.target.value }
                })
              }
            />
          </div>
          <div className="flex items-end justify-end gap-4">
            <button
              className="w-20 border-2 px-4 py-1 rounded-xl"
              onClick={handleSubmit}
            >
              {loading ? 'Loading... ' : 'Create'}
            </button>
            <button
              className="w-20 border-2 px-4 py-1 rounded-xl"
              onClick={() => setEditor(false)}
            >
              cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="border-2 w-[500px] min-h-20 flex items-center gap-4 py-3  px-3 bg-white rounded-xl ">
          <div className="w-12 h-12 rounded-full bg-gray-300 "></div>
          <div
            className="w-[430px]  h-12 rounded-3xl border-2 border-blue-600 pl-7 flex items-center "
            onClick={() => setEditor(true)}
          >
            Start a Post
          </div>
        </div>
      )}
    </div>
  )
}

export default CreatePost
