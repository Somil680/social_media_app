' use client'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { SessionProvider, useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { NextUIProvider } from '@nextui-org/react'
import { useEffect, useState } from 'react'

// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

interface Props {
  children: React.ReactNode
  session?: Session | null
}

export function Providers({ children, session }: Props) {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (document.readyState === 'complete') return setShowLoader(false)
    window.addEventListener('load', () => {
      setTimeout(() => {
        setShowLoader(false)
      }, 3000)
    })
  }, [])

  return (
    <NextUIProvider>
      <Provider store={store}>
        <SessionProvider session={session}>
          {showLoader ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
                background: 'white',
                zIndex: '1000',
              }}
            >
              <p
                style={{
                  fontSize: '1.5rem',
                  lineHeight: '1.5rem',
                  fontWeight: 500,
                }}
              >
                Connect together Always
              </p>
            </div>
          ) : (
            <>{children}</>
          )}
        </SessionProvider>
        {/* <ToastContainer /> */}
      </Provider>
    </NextUIProvider>
  )
}
