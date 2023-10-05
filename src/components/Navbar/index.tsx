' use client;'
import Link from 'next/link'
import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { BsMessenger } from 'react-icons/bs'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, Input } from '@nextui-org/react'
import { SearchIcon } from '@/assets/svg/searchIcon'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

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
  // {
  //   icon: <VscAccount />,
  //   name: 'Profile',
  //   url: '/profile',
  // },
]
const Navbar = ({}: Props) => {
  const { data } = useSelector((state: RootState) => state.profile)
  return (
    <>
      <div className="w-full flex justify-center ">
        <div className="w-full h-16 border-2 mb-2 flex justify-evenly items-center px-3 rounded-md bg-white fixed  z-50">
          <div>
            <p className="text-4xl"> Connect </p>
          </div>
          {/* <div className="w-96">
            <Input
              label="Search"
              isClearable
              variant="underlined"
              fullWidth={false}
              size="sm"
              radius="lg"
              classNames={{
                label: 'text-black/50 dark:text-white/90',
                input: [
                  // 'bg-transparent',
                  'text-black/90 dark:text-white/90',
                  // 'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                ],
                innerWrapper: 'bg-transparent',
                inputWrapper: [
                  'shadow-xl',
                  // 'bg-default-200/50',
                  // 'dark:bg-default/60',
                  // 'backdrop-blur-xl',
                  // 'backdrop-saturate-200',
                  'hover:bg-default-200/70',
                  // 'dark:hover:bg-default/70',
                  // 'group-data-[focused=true]:bg-default-200/50',
                  // 'dark:group-data-[focused=true]:bg-default/60',
                  '!cursor-text',
                ],
              }}
              placeholder="Type to search..."
              startContent={
                <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div> */}
          <div className="flex">
            {icons.map((item: any, index) => (
              <>
                <Link href={item.url} key={index}>
                  <div className=" w-fit p-1 items-center flex flex-col justify-center mx-2">
                    <p className="text-3xl">{item.icon}</p>
                    <p>{item.name}</p>
                  </div>
                </Link>
              </>
            ))}
            <div className="flex items-center">
              <Link href="/profile"></Link>
              <Dropdown>
                <DropdownTrigger>
                  <Avatar isBordered src={data?.users?.profile_pic} />
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="new">
                    <Link className="w-full" href="/profile">
                      Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="copy">
                    <Button onClick={() => signOut()}>Sign out</Button>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
