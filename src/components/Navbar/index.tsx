' use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { BsMessenger } from 'react-icons/bs'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, Card, Input, input } from '@nextui-org/react'
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
  // {
  //   icon: <BiSearch />,
  //   name: 'Search',
  //   url: '/',
  // },
  // {
  //   icon: <BsMessenger />,
  //   name: 'Message',
  //   url: '/',
  // },
  // {
  //   icon: <VscAccount />,
  //   name: 'Profile',
  //   url: '/profile',
  // },
]
const Navbar = ({}: Props) => {
  const { data: userSession }: any = useSession()
  const { data } = useSelector((state: RootState) => state.profile)
  const { data: userData, error } = useSelector(
    (state: RootState) => state.allUsers
  )
  const [inputData, setInputData] = useState('')
  const [loading, setLoading] = useState(false)
  const [isData, setIsData] = useState([])

  const handleChange = (e: any) => {
    setLoading(true)
    setInputData(e.target.value)
    const filterData = userData.filter(
      (item: any) =>
        item.first_name.toLowerCase().includes(inputData.toLowerCase()) ||
        item.username.toLowerCase().includes(inputData.toLowerCase())
    )
    setIsData(filterData)
    console.log(
      '🚀 ~ file: index.tsx:68 ~ handleChange ~ inputData:',
      inputData
    )
    if (inputData === ' ') setIsData([])
    setLoading(false)
  }
  return (
    <>
      <div className="w-full flex justify-center ">
        <div className="w-full h-16 border-2 mb-2 flex justify-evenly items-center px-3 rounded-md bg-white fixed  z-50">
          <div className="flex gap-5">
            <p className="text-4xl"> Connect </p>

            <div className="w-96 relative">
              <Input
                label="Search"
                isClearable
                variant="flat"
                fullWidth={false}
                size="sm"
                radius="lg"
                value={inputData}
                onChange={handleChange}
                classNames={{
                  label: 'text-black/50 dark:text-white/90',
                  input: [
                    'bg-transparent',
                    'text-black/90 dark:text-white/90',
                    'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                  ],
                  innerWrapper: 'bg-transparent',
                  inputWrapper: [
                    // 'shadow-xl',
                    'bg-default-200/50',
                    'dark:bg-default/60',
                    'backdrop-blur-xl',
                    'backdrop-saturate-200',
                    'hover:bg-default-200/70',
                    'dark:hover:bg-default/70',
                    'group-data-[focused=true]:bg-default-200/50',
                    'dark:group-data-[focused=true]:bg-default/60',
                    '!cursor-text',
                  ],
                }}
                placeholder="Type to search..."
                startContent={
                  <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
              />
              {/* {isData.length > 0 && (
                <Card className="w-full h-28 absolute">
                  {isData.map((item: any) => (
                    <>
                      <p>
                        {item.first_name}&nbsp;{item.last_name}
                      </p>
                    </>
                  ))}
                </Card>
              )} */}
            </div>
          </div>
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
              <Dropdown>
                <DropdownTrigger>
                  <Avatar isBordered src={userSession?.user?.profile_pic} />
                  {/* <p>Me</p> */}
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="new">
                    <Link className="w-full" href="/profile">
                      Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="copy">
                    <Button color="danger" fullWidth onClick={() => signOut()}>
                      Logout
                    </Button>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              {userSession ? (
                <button onClick={() => signOut()}>Sign out</button>
              ) : (
                <button onClick={() => signIn()}>Sign in</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Navbar
