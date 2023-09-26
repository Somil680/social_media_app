'use client'
import React, { useEffect, useState } from 'react'
// import styles from './styles.module.css'
import { signIn } from 'next-auth/react'
import { API_BASE_URL } from '@/services/constant'
import { useSearchParams } from 'next/navigation'
type Props = {}

const LogIn = ({}: Props) => {
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
  }, [])
  return (
    <>
      <div className="w-full h-full relative ">
        <div className="absolute left-[40%]  mt-[15%] flex flex-col items-center">
          <h1>Connect</h1>
          <form
            action="/login"
            method="post"
            className=" border p-3  bg-white rounded"
            onSubmit={handleSubmit}
          >
            <h1 className="text-left py-5">Log In</h1>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                id="email"
                onChange={(e) =>
                  setInputData((prev) => {
                    return { ...prev, email: e.target.value }
                  })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                {' '}
                Password{' '}
              </label>
              <input
                required
                type="password"
                name="password"
                id="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) =>
                  setInputData((prev) => {
                    return { ...prev, password: e.target.value }
                  })
                }
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                {loading ? 'Loading...' : 'Login'}
              </button>
              <a href="/signup" className="text-gray-500">
                Don`t have an account? <u>Sign up</u>
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LogIn
