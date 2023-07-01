'use client'

import React, { useState } from 'react'
// import styles from './styles.module.css'
import {BsThreeDots ,BsHeart , BsBookmark} from "react-icons/bs"
import {FaRegComment} from "react-icons/fa"
import { IoPaperPlaneOutline } from "react-icons/io5"
import post from "@/assets/images/post.png.png"
import user from "@/assets/images/footer_logo.png"
import Image from 'next/image'
type Props = {}
interface DataList {
    name :string
    designation: string
    post: any
    user_profile: any
    me_profile : any
}

const data:DataList[]= [
    {
        name: "social media ",
        designation: "frontend developer",
        post: post,
        user_profile : user,
        me_profile: user,
    },
    {
        name: "social media ",
        designation: "frontend developer",
        post: post,
        user_profile : user,
        me_profile: user,
    },
    {
        name: "social media ",
        designation: "frontend developer",
        post: post,
        user_profile : user,
        me_profile: user,
    },
]
const arr = [1,2,3,4,5,6,7,8,9]
const PostView = ({ }: Props) => {
    
 const [isOpenComment , setIsOpenComment] = useState(false)

    return <>
        <div className='w-[630px] h-full items-center flex flex-col gap-y-6'>
            {data.map((item ,index ) => (
                <div className='p-8 items-center flex flex-col gap-y-6   bg-gray-100' key={index}>
            <div className='flex items-center '>
                        <div className='w-14 h-14 rounded-full border border-black'> <Image alt='post' src={item.user_profile}/></div>
                        <p className='w-96 h-8  rounded-md ml-4'>{item.name}</p>
                    <p className='text-3xl ml-12'><BsThreeDots/></p>
            </div>
            <div className='w-full h-full  rounded items-center flex justify-center overflow-hidden'><Image alt='post' src={item.post} />
            </div>
            <div className='flex justify-between w-full'>
                <div className='text-3xl flex gap-10'  >
                            <BsHeart />
                            <div onClick={()=>setIsOpenComment(!isOpenComment)}>

                <FaRegComment />
                            </div>
                <IoPaperPlaneOutline/>
                </div>
                <div className='text-3xl'>
                <BsBookmark/>
                </div>
                    </div>
              
                        (<div className='flex justify-between w-full'>
                            <div className='w-14 h-14  rounded-full border border-black'><Image alt='post' src={item.me_profile} /></div>
                            <input type="text" name="" id="" placeholder='write something..' className=' bg-gray-200 border border-gray-400 rounded-full w-[29rem] px-8' />
                        </div>) 
         </div>
        ))}
        </div>
        
        {/* <div className='w-[630px] h-full bg-gray-200 items-center flex flex-col gap-y-6'>
            
        <div className='p-8 items-center flex flex-col gap-y-6 '>
            <div className='flex items-center '>
                    <div className='w-14 h-14 bg-gray-300 rounded-full'></div>
                    <p className='w-96 h-8 bg-gray-300 rounded-md ml-4'></p>
                    <p className='text-3xl ml-12'><BsThreeDots/></p>
            </div>
            <div className='w-full h-[468px] bg-gray-300 rounded'>
            </div>
            <div className='flex justify-between w-full'>
                <div className='text-3xl flex gap-10'  >
                <BsHeart />
                <FaRegComment />
                <IoPaperPlaneOutline/>
                </div>
                <div className='text-3xl'>
                <BsBookmark/>
                </div>
            </div>
            <div className='flex justify-between w-full'>
                <div className='w-14 h-14 bg-gray-300 rounded-full'></div>
                <input type="text" name="" id="" placeholder='write something..' className=' bg-gray-200 border border-gray-400 rounded-full w-[29rem] px-8' />
            </div>
         </div>
    </div> */}
    </>
}

export default PostView