import Head from "next/head";
import Layout from "@/components/layout/layout";
import Link from "next/link";
import styles from '../styles/Form.module.css';
import { HiOutlineUser, HiEye, HiEyeOff } from "react-icons/hi";
import { SyntheticEvent, useState, useEffect } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';


export default function Login () {
  const [show, setShow] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();





  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/api-token-auth',
    JSON.stringify({
      username: username,
      password: password
    }),
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    },
    )
    .then(res => {
        if(res.status !== 200) {
          throw new Error('Could not connect to the server')
        }
        router.push('/')
        console.log(res.data.token)
    }).catch(function(err) {
        console.log(err.message);
    })
  }

  return (
    <Layout>
      <Head>
        <title>Alumni Portal | Log in</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div>
          <h1 className="text-[#40BA21] font-['Montserrat'] text-4xl font-bold py-4">Log in</h1>
        </div>
        {/* { error } */}
        <form onSubmit={submit} className="flex flex-col gap-5">
          <div className={styles.input_group}>
            <input 
              type="username" 
              name="username"
              placeholder="Username"
              onChange={e => setUserName(e.target.value)}
              className={styles.input_text}
            />
            <span className="icon flex items-center px-4">
              <HiOutlineUser size={20}/>
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show ? "text" : "password"}`} 
              name="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              className={styles.input_text}
            />
            <span className="icon flex items-center px-4 hover:cursor-pointer hover:text-[#402F6E]" onClick={() => setShow(!show)}>
              {show 
                ? <HiEye size={20}/> 
                : <HiEyeOff size={20}/>
              }
            </span>
          </div>
          <div className="input-button">
            <button type="submit" className={styles.button}>
                Log in
            </button>
          </div>
        </form>
        <p className="text-center text-[#777777]">
            Don&apos;t have an account? Go to <Link href={'/register'} className="font-bold">Sign Up</Link>
        </p>
      </section>
    </Layout>
  )
}