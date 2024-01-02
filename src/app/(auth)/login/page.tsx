'use client'
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useSearchParams, redirect } from 'next/navigation'
import { Button, CircularProgress, Input, Link } from '@nextui-org/react'
import { EyeFilledIcon, EyeSlashFilledIcon } from '@/assets/svg/svg'
type Props = {}

const LogIn = ({}: Props) => {
  const { data: session } = useSession()

  const searchParams = useSearchParams()
  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    console.log('🚀 ~ file: page.tsx:12 ~ LogIn ~ inputData:', inputData)
    const result = await signIn('credentials', {
      email: inputData.email,
      password: inputData.password,
      redirect: true,
      callbackUrl: '/',
    })
    if (result?.error === 'CredentialsSignin') {
      setLoading(false)
      window.alert('Incorrect credentials')
    }
  }
  useEffect(() => {
    const error = searchParams.get('error')
    if (error === 'CredentialsSignin') {
      window.alert('worng credentials')
    }
  }, [searchParams])

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
        <div className=" ">
          <h1 className="text-4xl font-bold">CONNECT</h1>
        </div>

        <form
          className="flex flex-col gap-4 w-96 "
          action="/login"
          method="post"
          onSubmit={handleSubmit}
        >
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
          <p className="text-center text-small">
            Need to create an account?{' '}
            <Link size="sm" href="/signup">
              Sign up
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
                'Login'
              )}
            </Button>
          </div>
        </form>
        <Button onClick={() => signIn('github')}>SignIn by GITHUB</Button>
        <Button onClick={() => signIn('google')}>SignIn by GOOGLE</Button>
      </div>
    </>
  )
}

export default LogIn
