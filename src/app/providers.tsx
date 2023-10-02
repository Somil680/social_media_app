' use client'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
// import { NextUIProvider } from '@nextui-org/react'

// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

interface Props {
  children: React.ReactNode
  session?: Session | null
}

export function Providers({ children, session }: Props) {
  return (
    // <NextUIProvider>
    <Provider store={store}>
      <SessionProvider session={session}>{children}</SessionProvider>
      {/* <ToastContainer /> */}
    </Provider>
    // </NextUIProvider>
  )
}
