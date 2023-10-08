' use client;'
import { closeModal } from '@/redux/slices/modal'
import { RootState } from '@/redux/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileModal from '../Modal/Profile'
import UploadImage from '../Modal/uploadIamge'
import { MdClose } from 'react-icons/md'
import './styles.css'
import CreatePost from './createPost'

type Props = {}

const ModalManager = ({}: Props) => {
  const dispatch = useDispatch()
  const { activeModal } = useSelector((state: RootState) => state.modal)

  useEffect(() => {
    if (activeModal !== null) document.body.style.overflow = 'hidden'
    else
      setTimeout(() => {
        document.body.style.overflow = 'auto'
      }, 500)
  }, [activeModal])

  return (
    <>
      <section className="modal-manager">
        {activeModal !== null && (
          <div className="fixed top-0 left-0 w-full h-full z-50 grid justify-center items-center overflow-y-auto  bg-black bg-opacity-[0.6]">
            <main className="relative  -webkit-border-radius-[15px]">
              {activeModal === 'profile' && <ProfileModal />}
              {activeModal === 'uploadImage' && <UploadImage />}
              {activeModal === 'createPost' && <CreatePost />}

              <span
                className="absolute top-4 , right-4 cursor-pointer w-8  h-8 grid place-items-center rounded-full hover:bg-gray-500"
                onClick={() => dispatch(closeModal())}
              >
                <MdClose />
              </span>
            </main>
          </div>
        )}
      </section>
    </>
  )
}

export default ModalManager
