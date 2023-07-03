'use client'

import { Provider } from 'react-redux'
import {store} from '@/redux/store'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

interface Props {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      {children}
      {/* <ToastContainer /> */}
    </Provider>
  )
}