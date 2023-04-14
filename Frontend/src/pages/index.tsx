import Head from 'next/head'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '@/components/layout/header';
import Profile from './profile';
import Course from './course';


const title: string = "Innopolis Alumni Portal";

// export const getStaticProps = async () => {
//   const API_URL = "http://localhost:8000/courses"
//   const request = await fetch(API_URL)
//   const courses = await request.json()
//   return  { props : { courses } }
// }

export default function Home({ courses }: any) {
  const [auth, setAuth] = useState(false)
  // const [message, setMessage] = useState('')
  // useEffect(() => {
    
  // });

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
          ? User({ courses }) 
          : Guest()
        }
        {/* {message} */}
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
        <Link href={'/login'} className='mt-5 px-10 py-1 rounded-sm bg-[#40BA21] text-[#FFFFFF]'>Log in</Link>
      </div>
    </main>
  )
}

// Authorize User
function User({ courses }: any) {
  return (
    <main className='text-center'>
      <h3 className='text-4xl font-bold'>
        {courses.map((course: any) => (
          <Link href={`courses/${course.name}`}>
             <a key={course.name}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p>{course.tutor}</p>
                <p>{course.available_places}</p>
             </a>
          </Link>
        ))}  
      </h3>

      <div className='flex justify-center'>
        <button className='mt-5 px-10 py-1 rounded-sm bg-[#40BA21] text-[#FFFFFF]'>Signout</button>
      </div>
    </main>
  )
}
