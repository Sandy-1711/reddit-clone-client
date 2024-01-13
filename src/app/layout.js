import { Inter } from 'next/font/google'
import './globals.css'
import ReduxProvider from '../../redux/Provider'
import Navbar from './(components)/Navbar'
// import {store} from '../../redux/store'
// import { Provider } from 'react-redux'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard',
  description: '',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Navbar />
          {/* <div className='w-screen h-14'></div> */}
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
