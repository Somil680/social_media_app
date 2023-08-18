import React from 'react'
import Image from 'next/image'
import {BiSolidEditAlt} from "react-icons/bi"




import banner from "@/assets/images/banner.jpg"
import footer from "@/assets/images/footer_logo.png"
import post from "@/assets/images/post.png.png"


type Props ={}

const Profile = ({ }: Props) => {
    
    
    return <>
        
        <div className='w-[1000px]  border rounded-xl mt-6 relative bg-white'>
            <div className='absolute top-52 right-5  text-xl p-2 hover:bg-gray-200 hover:rounded-full'>
                <BiSolidEditAlt/>
        </div>
        <div className='h-[201px] bg-cover object-cover overflow-hidden border'>
            <Image src={banner} alt="" width={1000} height={201} />
        </div>
        <div className='border w-52 h-52 rounded-full ml-8 absolute top-20 bg-white'>
            <Image src={footer} alt='' width={200} height={200} />
        </div>
        <div className=' mt-24 ml-8 gap-2 h-full  flex flex-col py-4'>
            <h1 className='text-3xl'>Somil Agrawal</h1>
            <p>Frontend devloper | React.js | next.js </p>
            <p className='text-gray-400'>talk about  Frontend devloper | React.js | next.js </p>
            <p className='text-gray-400'>Guna , Madhya Pradesh </p>
            <div className='flex gap-4 text-blue-600 '>

                <p>0 Followers</p>
                <p>0 Connections</p>
            </div>
        </div>
    </div>
        <div className='w-[1000px]  border rounded-xl mt-4  gap-1 h-full  flex flex-col py-4 px-8 bg-white '>
            
            <h1 className='text-xl font-medium'>Activity</h1>
            <p className='text-blue-600 text-sm font-medium'>0 Posts</p>
            <div className='flex flex-wrap mt-4 gap-2 '>
                <div className='w-40 h-40 object-cover overflow-hidden'>

                <Image src={post} alt='' width={150} height={150}/>
                </div>
                <div className='w-40 h-40 object-cover overflow-hidden'>

                <Image src={post} alt='' width={150} height={150}/>
                </div>
                <div className='w-40 h-40 object-cover overflow-hidden'>

                <Image src={post} alt='' width={150} height={150}/>
                </div>
                <div className='w-40 h-40 object-cover overflow-hidden'>

                <Image src={post} alt='' width={150} height={150}/>
                </div>
               </div>
          
        </div></>
}

export default Profile