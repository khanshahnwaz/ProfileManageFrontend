import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {ProfileState} from '../Context/ProfileState'
export default function App({ Component, pageProps }: AppProps) {
  return <ProfileState>
   <Component {...pageProps} />
   </ProfileState>
}
