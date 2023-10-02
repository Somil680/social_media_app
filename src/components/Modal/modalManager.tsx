' use client;'
import { closeModal } from '@/redux/slices/modal'
import { RootState } from '@/redux/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileModal from '../Modal/Profile'
import UploadImage from '../Modal/uploadIamge'
import { MdClose } from 'react-icons/md'
import './styles.css'

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
          <div className="fixed top-0 left-0 w-full h-full z-50 grid justify-center items-center overflow-y-auto py-10 bg-black bg-opacity-[0.6]">
            <main className="relative  -webkit-border-radius-[15px]">
              {activeModal === 'profile' && <ProfileModal />}
              {activeModal === 'uploadImage' && <UploadImage />}

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

//  padding: 2rem;

//     min-width: 700px;
//     height: 700px;
//     overflow-y: scroll;
//     position: relative;
//     background-color: #f6fafd;
//     border-radius: 15px;
//     -webkit-border-radius: 15px;
//     -moz-border-radius: 15px;
//     -ms-border-radius: 15px;
//     -o-border-radius: 15px;

// .modal {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 50;
//   display: grid;
//   justify-content: center;
//   align-items: center;
//   overflow-y: auto;
//   padding: 40px 0;
//   background-color: rgb(0 0 0 / 0.6);
// }

// .modal main {
//   position: relative;
// }

// .close-icon {
//   position: absolute;
//   top: 1rem;
//   right: 1rem;
//   cursor: pointer;
//   width: 2rem;
//   height: 2rem;
//   display: grid;
//   place-items: center;
//   border-radius: 100%;
// }

// .close-icon:hover {
//   background-color: #5d49ab2f;
// }
