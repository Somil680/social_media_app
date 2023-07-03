import Image from 'next/image'
import PostView from '@/components/Hompage/PostView'
import FollowContainer from '@/components/Hompage/FollowContainer'
import FeedContainer from '@/components/Hompage/FeedContainer'
export default function Home() {
  return (
    <main className="w-full h-full flex justify-center">

      <div className='max-w-[1256px] h-full mt-2  flex gap-10 rounded-md'>
        <FeedContainer/>
       <PostView/>
       <FollowContainer/>
        


        </div>
  

   

    </main>
  )
}
