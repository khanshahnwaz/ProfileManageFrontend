import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState,useEffect, useContext } from 'react';
const inter = Inter({ subsets: ['latin'] })
import Register from "../Components/auth/Signup";
import Login from "../Components/auth/Login";
import { ProfileContext } from '@/Context/ProfileState';
import { useRouter } from 'next/router';
export default function Home() {
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(true);
  const router=useRouter();
const context=useContext(ProfileContext)
  useEffect(() => {
    if(localStorage.getItem("token"))
          router.push("/home") 
  },[context]);
  return (
    <main className="">
      {signUp ? <Register setSignIn={setSignIn} setSignUp={setSignUp} /> : null}
      {signIn ? <Login setSignIn={setSignIn} setSignUp={setSignUp} /> : null}
    </main>
  );
}
