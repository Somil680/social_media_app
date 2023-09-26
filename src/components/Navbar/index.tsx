'use client'
import Link from 'next/link'
import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { BsMessenger } from 'react-icons/bs'
import { VscAccount } from 'react-icons/vsc'
import { useSession, signIn, signOut } from 'next-auth/react'

type Props = {}
interface NavList {
  icon: any
  name: string
  url: string
}
const icons: NavList[] = [
  {
    icon: <AiFillHome />,
    name: 'Home',
    url: '/',
  },
  {
    icon: <BiSearch />,
    name: 'Search',
    url: '/',
  },
  {
    icon: <BsMessenger />,
    name: 'Message',
    url: '/',
  },
  {
    icon: <VscAccount />,
    name: 'Profile',
    url: '/profile',
  },
]

const Navbar = ({}: Props) => {
  const { data: session } = useSession()

  return (
    <>
      <div className="w-full flex justify-center ">
        <div className="w-[1256px] h-24 border-2 my-2 flex justify-between items-center px-3 rounded-md bg-white">
          <div>
            <p className="text-4xl"> Connect </p>
          </div>
          <div className="flex">
            {icons.map((item) => (
              <>
                <Link href={item.url} key={item.name}>
                  <div className=" w-fit p-1 items-center flex flex-col justify-center mx-2">
                    <p className="text-3xl">{item.icon}</p>
                    <p>{item.name}</p>
                  </div>
                </Link>
              </>
            ))}
            {session ? (
              <>
                Signed in as {session?.user?.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
              </>
            ) : (
              <>
                Not signed in <br />
                <button onClick={() => signIn()}>Sign in</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
