import Head from 'next/head'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from 'components/layout/header';


const title: string = "Innopolis Alumni Portal";

export default function Home() {
  const [auth, setAuth] = useState(false)
  const [message, setMessage] = useState('')

  useEffect( () => {
    (
      async () => {
        try {
          const res = await fetch(
            'https://alumni.pythonanywhere.com/accounts/profile', 
            {
              credentials: 'include',
            });
          const content = await res.json();
          setMessage(`${content}`)
          setAuth(true);
          // console.log(content)
        } catch (err) {
          console.log(err);
          setAuth(false);
        }
      }
    ) ();
  });

  return (
    <div className='h-screen bg-[#2A347B] text-[#777777]'>
      <Head>
        <title>{ title }</title>
        <meta name="description" content="Uchenna Bright Ugwumadu" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="innopolis icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
        {auth 
          ? User() 
          : Guest()
        }
        {message}
      </div>
    </div>
  )
}

// Guest User
function Guest() {
  return (
    <main className='text-center'>
      <h3 className='text-4xl font-bold'> {title} </h3>
      <div className='flex justify-center'>
        <Link href={'/login'} className='mt-5 px-10 py-1 rounded-sm bg-[#40BA21] text-[#FFFFFF]'>Login</Link>
      </div>
    </main>
  )
}

// Authorize User
function User() {
  return (
    <main className='text-center'>
      <h3 className='text-4xl font-bold'> {title} </h3>

      <div className='flex justify-center'>
        <button className='mt-5 px-10 py-1 rounded-sm bg-[#40BA21] text-[#FFFFFF]'>Signout</button>
      </div>
    </main>
  )
}
