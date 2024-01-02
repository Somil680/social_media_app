'use client'
// import styles from './website.module.css'
import ModalManager from '@/components/Modal/modalManager'
import Navbar from '@/components/Navbar'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-#f4f2ee">
        {children}
      </main>
      <ModalManager />
    </>
  )
}
