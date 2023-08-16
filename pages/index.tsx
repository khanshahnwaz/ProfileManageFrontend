import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react';
const inter = Inter({ subsets: ['latin'] })
import Register from "../Components/auth/Signup";
import Login from "../Components/auth/Login";

export default function Home() {
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(true);
  return (
    <main className="grid gap-y-8">
      {signUp ? <Register setSignIn={setSignIn} setSignUp={setSignUp} /> : null}
      {signIn ? <Login setSignIn={setSignIn} setSignUp={setSignUp} /> : null}
    </main>
  );
}
