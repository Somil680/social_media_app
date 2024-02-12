'use client'
import { registerNewUser } from '@/services/services'
import { Button, CircularProgress, Input } from '@nextui-org/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { EyeFilledIcon, EyeSlashFilledIcon } from '@/assets/svg/svg'

type Props = {}

const SignUp = ({}: Props) => {
  //   const { router }:any = useRouter()
  const [loading, setLoading] = useState(false)
  const [inputData, setInputData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e: any) => {
    setLoading(true)
    e.preventDefault()
    const { res, err } = await registerNewUser(inputData)
    if (err || !res) throw new Error('Fetch failed')
    const { user } = await res.json()
    const result = await signIn('credentials', {
      email: inputData.email,
      password: inputData.password,
      redirect: true,
      callbackUrl: '/',
    })
    setLoading(false)
    // router.push('/login')
  }

  const [value, setValue] = React.useState('')

  const validateEmail = (value: any) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)

  const isInvalid = React.useMemo(() => {
    if (value === '') return false

    return validateEmail(value) ? false : true
  }, [value])
  const [isVisible, setIsVisible] = React.useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)
  return (
    <>
      <div className=" flex flex-col gap-10 items-center justify-center mt-[50%] ">
        <div className=" ">
          <h1 className="text-4xl font-bold">CONNECT</h1>
        </div>

        <form
          className="flex flex-col gap-4 w-96 "
          action="/login"
          method="post"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-3">
            <Input
              isRequired
              type="text"
              label="Name"
              variant="bordered"
              value={inputData.first_name}
              onChange={(e) =>
                setInputData((prev) => {
                  return { ...prev, first_name: e.target.value }
                })
              }
            />
            <Input
              isRequired
              type="text"
              label="Surname"
              variant="bordered"
              value={inputData.last_name}
              onChange={(e) =>
                setInputData((prev) => {
                  return { ...prev, last_name: e.target.value }
                })
              }
            />
          </div>
          <Input
            isRequired
            type="text"
            label="Username"
            variant="bordered"
            value={inputData.username}
            onChange={(e) =>
              setInputData((prev) => {
                return { ...prev, username: e.target.value }
              })
            }
          />
          <Input
            isRequired
            value={value}
            type="email"
            label="Email"
            variant="bordered"
            isInvalid={isInvalid}
            color={isInvalid ? 'danger' : 'default'}
            errorMessage={isInvalid && 'Please enter a valid email'}
            onValueChange={setValue}
            placeholder="johndeo@gmail.com"
            onChange={(e) =>
              setInputData((prev) => {
                return { ...prev, email: e.target.value }
              })
            }
          />
          <Input
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            onChange={(e) =>
              setInputData((prev) => {
                return { ...prev, password: e.target.value }
              })
            }
            type={isVisible ? 'text' : 'password'}
          />
          <p className="text-center text-small ">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 underline">
              SignIn
            </Link>
          </p>
          <div className="flex gap-2 justify-end">
            <Button fullWidth color="primary" type="submit">
              {loading ? (
                <CircularProgress
                  aria-label="Loading..."
                  size="sm"
                  color="primary"
                  className="text-white "
                />
              ) : (
                'SignUp'
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default SignUp

{
  /* <section className="w-full h-full relative ">
    <form
      className=" absolute left-[40%] mt-[15%] max-w-md mx-auto  p-4 border-2 bg-white rounded"
      onSubmit={handleSubmit}
    >
      <h2 className="text-center mb-4">Sign Up</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">
          Username
        </label>
        <input
          required
          placeholder="Username"
          type="text"
          id="name"
          className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          name="username"
          value={input.username}
          onChange={(e) =>
            setInput((prev) => {
              return { ...prev, username: e.target.value }
            })
          }
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          required
          placeholder="example@example.com"
          type="email"
          id="email"
          name="email"
          value={input.email}
          className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e) =>
            setInput((prev) => {
              return { ...prev, email: e.target.value }
            })
          }
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">
          Password
        </label>
        <input
          required
          placeholder="*******"
          type="password"
          id="password"
          name="password"
          value={input.password}
          className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e) =>
            setInput((prev) => {
              return { ...prev, password: e.target.value }
            })
          }
        />
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="btn btn-primary w-full p-2 mb-2 bg-indigo-300 rounded"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <a href="/login" className="text-gray-500">
          Already have an account? <u>Sign in</u>
        </a>
      </div>
    </form>
  </section> */
}
