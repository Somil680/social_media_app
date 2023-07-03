'use client'

import React, { useState } from 'react'
// import styles from './styles.module.css'
import { BsThreeDots, BsHeart, BsBookmark } from "react-icons/bs"
import { FaRegComment } from "react-icons/fa"
import { IoPaperPlaneOutline } from "react-icons/io5"
import post from "@/assets/images/post.png.png"
import user from "@/assets/images/footer_logo.png"
import Image from 'next/image'
import { Input, Textarea, User } from '@nextui-org/react'
import { SendButton } from "../../../button/SendButton";
import { SendIcon } from "../../../button/SendIcon";
import { useDispatch, useSelector } from 'react-redux'
import { IncrementLikes , DiscernmentLikes, selectCount } from '@/redux/slices/like'

type Props = {}
interface DataList {
    name: string
    designation: string
    post: any
    user_profile: any
    me_profile: any
    discription : string
}

const data: DataList[] = [
    {
        name: "Ariana Wattson",
        designation: "frontend developer",
        post: post,
        user_profile: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        me_profile: user,
        discription : "Lorem ipsum dolor, sit  consectetur adipisicing elit. Quo iste perspiciatis, repellendus ut harum incidunt, quos atque aliquid recusandae rem nobis voluptate possimus fuga dolorum, quaerat reiciendis pariatur magnam nemo!",
    },
    {
        name: "Ariana Wattson",
        designation: "frontend developer",
        post: post,
        user_profile: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        me_profile: user,
         discription : "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo iste perspiciatis, repellendus ut harum incidunt, quos atque aliquid recusandae rem nobis voluptate possimus fuga dolorum, quaerat reiciendis pariatur magnam nemo!",
    },
    {
        name: "Ariana Wattson",
        designation: "frontend developer",
        post: post,
        user_profile: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        me_profile: user,
         discription : "Lorem ipsum dolor, sit  consectetur adipisicing elit. Quo iste perspiciatis, repellendus ut harum incidunt, quos atque aliquid recusandae rem nobis voluptate possimus fuga dolorum, quaerat reiciendis pariatur magnam nemo!",
    },
]
const PostView = ({ }: Props) => {
    const  count = useSelector(selectCount)
    const dispatch = useDispatch()
    // const [isOpenComment, setIsOpenComment] = useState(false)

    return <>
        <div className='w-full h-full  flex flex-col gap-y-6'>
            {data.map((item, index) => (
                <div className='p-8 flex flex-col gap-y-6 bg-gray-100 w-[468px] '  key={index}>
                    <div className='flex justify-between '>
                        <div>
                            <User
                                src={item.user_profile}
                                name={item.name}
                                description="UI/UX Designer @Github"
                            />
                        </div>
                        <div className='text-2xl '><BsThreeDots /></div>

                    </div>
                    <div>
                        <p>{item.discription}</p>
                    </div>
                    <div className='w-full h-full  rounded items-center flex justify-center overflow-hidden'><Image alt='post' src={item.post} />
                    </div>
                    <div className='flex justify-between w-full'>
                        <div className='text-3xl flex gap-10'  >
                            <div onClick={()=>dispatch(IncrementLikes())}>

                            <BsHeart /> {count}
                            </div>

                                <FaRegComment />
                            
                            <IoPaperPlaneOutline />
                        </div>
                        <div className='text-3xl'>
                            <BsBookmark />
                        </div>
                    </div>

                    <div className='flex justify-between w-full'>
                        <User
                            src={item.user_profile}
                            name=""
                            className='pl-0'
                        />
                        <Input
                            width='100%'
                            clearable
                            color='warning'
                            contentRightStyling={false}
                            placeholder="Type your message..."
                            contentRight={
                                <SendButton>
                                    <SendIcon filled={undefined} size={undefined} height={undefined} width={undefined} label={undefined} className={undefined}  />
                                </SendButton>
                            }
                        />
                    </div>

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