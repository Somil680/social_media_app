' use client'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { SessionProvider } from 'next-auth/react'
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
  const [showLoader, setShowLoader] = useState(false)
  useEffect(() => {
    switch (document.readyState) {
      case 'loading':
        return setShowLoader(true)

      case 'interactive': {
        // The document has finished loading and we can access DOM elements.
        // Sub-resources such as scripts, images, stylesheets and frames are still loading.
        return setShowLoader(true)
      }
      case 'complete':
        // The page is fully loaded.

        console.log(
          `The first CSS rule is: ${document.styleSheets[0].cssRules[0].cssText}`
        )
        return setShowLoader(false)
    }
  }, [])
  return (
    <NextUIProvider>
      <Provider store={store}>
        <SessionProvider session={session}>
          {showLoader && (
            <div
              style={{
                display: 'flex',
                position: 'fixed',
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
          )}
          {children}
        </SessionProvider>
        {/* <ToastContainer /> */}
      </Provider>
    </NextUIProvider>
  )
}
