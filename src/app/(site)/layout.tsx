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
      <section>
        <Navbar />
        <main id="main">{children}</main>
      </section>
      <ModalManager />
    </>
  )
}
