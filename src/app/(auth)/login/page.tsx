'use client'
import React, { useState } from 'react'
// import styles from './styles.module.css'
import { signIn } from 'next-auth/react'
import { API_BASE_URL } from '@/services/constant'
type Props = {}

const LogIn = ({}: Props) => {
  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  })
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log('🚀 ~ file: page.tsx:12 ~ LogIn ~ inputData:', inputData)
    await signIn('credentials', {
      email: inputData.email,
      password: inputData.password,
      redirect: true,
      callbackUrl: '/',
    })
  }

  return (
    <>
      <div className="w-full h-full relative">
        <form
          action="/login"
          method="post"
          className=" border p-3 absolute left-[40%]  mt-[15%] bg-white rounded"
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
              Login
            </button>
            <a href="/signup" className="text-gray-500">
              Don`t have an account? <u>Sign up</u>
            </a>
          </div>
        </form>
      </div>
    </>
  )
}

export default LogIn
