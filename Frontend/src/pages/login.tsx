import Head from "next/head";
import Layout from "@/components/layout/authLayOut";
import Link from "next/link";
import styles from '../styles/Form.module.css';
import { HiOutlineMail, HiEye, HiEyeOff } from "react-icons/hi";
import { SyntheticEvent, useState, useEffect } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';


export default function Login () {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();





  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/api-token-auth',
    JSON.stringify({
      username: email, //change the username later
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
      console.log("res", res)
        if(res.status !== 200) {
          throw new Error('Could not connect to the server')
        }
        router.push('/')
        console.log(res.data.token)
    }).catch(function(err) {
      if(err.response) {
        setErrorMessage(err.response.data);
      }
    })
  }

  const getErrorMessage = (key: string): string => {
    if (errorMessage && errorMessage[key]) {
      return errorMessage[key];
    }
    return '';
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
          <div>
            {/* <label>Email</label> */}
            <div className={styles.input_group}>
              <input 
                // type="email" 
                type="text" //to change later
                name="email"
                placeholder= "a.b@innopolis.ru"
                onChange={e => setEmail(e.target.value)}
                className={styles.input_text}
              />
              <span className="icon flex items-center px-4">
                <HiOutlineMail size={20}/>
              </span>
            </div>
            {getErrorMessage('username') && <span className="text-red-500"> {getErrorMessage('username')[0].split('.')[0]} </span>}
          </div>
          <div>
            {/* <label>Password</label> */}
            <div className={styles.input_group}>
              <input
                type={`${show ? "text" : "password"}`} 
                name="password"
                placeholder="password"
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
            {getErrorMessage('password') && <span className="text-red-500"> {getErrorMessage('password')[0].split('.')[0]} </span>}
          </div>

          {getErrorMessage('non_field_errors') && <span className="text-red-500"> {getErrorMessage('non_field_errors')[0].split('.')[0]} </span>}
          
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