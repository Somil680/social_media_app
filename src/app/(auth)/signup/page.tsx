'use client'
import { registerNewUser } from '@/services/services'
import { NextRouter, useRouter } from 'next/router'
import React, { useState } from 'react'
// import styles from './styles.module.css'

type Props = {}

const SignUp = ({}: Props) => {
  //   const { router }:any = useRouter()
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e: any) => {
    setLoading(true)
    e.preventDefault()
    console.log('🚀 ~ file: page.tsx:18 ~ handleSubmit ~ input:', input)
    const { res, err } = await registerNewUser(input)
    if (err || !res) throw new Error('Fetch failed')
    const { user } = await res.json()
    console.log('🚀 ~ file: page.tsx:23 ~ handleSubmit ~ user:', user)
    setLoading(false)
    // router.push('/login')
  }

  return (
    <>
      <section className="w-full h-full relative ">
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
              name="username"
              value={input.username}
              className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
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
      </section>
    </>
  )
}

export default SignUp
