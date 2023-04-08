import Head from "next/head";
import Layout from "@/components/layout/layout";
import styles from '../styles/Form.module.css';
import { HiOutlineUser, HiOutlineBookOpen, HiEye, HiEyeOff } from "react-icons/hi";
import { SyntheticEvent, useState } from 'react';
import Link from "next/link";
import { PasswordCredential } from "@/interfaces";
import { useRouter } from "next/router";
import axios from 'axios';

export default function Register () {
  const [show, setShow] = useState<PasswordCredential>({password: false, confirmPassword: false});
  const [username, setUserName] = useState('');
  const [diplomaId, setDiplomaId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();


  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/register',
      JSON.stringify({
        username: username,
        diploma_id: diplomaId,
        password: password,
        password2: confirmPassword
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        }
      },
      )
      .then(res => {
          if(res.status !== 200) {
            throw new Error('Could not connect to the server')
          }
          router.push('/login')
      }).catch(function(err) {
        console.log(err.message);
    })
  }
    
  return (
    <Layout>
      <Head>
        <title>Alumni Portal | Register</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div>
          <h1 className="text-[#40BA21] font-['Montserrat'] text-4xl font-bold py-4">Sign Up</h1>
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
              type="diplomaId" 
              name="diplomaId"
              placeholder="Diploma ID"
              onChange={e => setDiplomaId(e.target.value)}
              className={styles.input_text}
            />
            <span className="icon flex items-center px-4">
              <HiOutlineBookOpen size={20}/>
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show.password ? "text" : "password"}`} 
              name="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              className={styles.input_text}
            />
            <span className="icon flex items-center px-4 hover:cursor-pointer hover:text-[#6366f1]" onClick={() => setShow({...show, password:!show.password})}>
              {show.password 
                ? <HiEye size={20}/> 
                : <HiEyeOff size={20}/>
              }
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show.confirmPassword ? "text" : "password"}`} 
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={e => setConfirmPassword(e.target.value)}
              className={styles.input_text}
            />
            <span className="icon flex items-center px-4 hover:cursor-pointer hover:text-[#6366f1]" onClick={() => setShow({...show, confirmPassword:!show.confirmPassword})}>
              {show.confirmPassword 
                ? <HiEye size={20}/> 
                : <HiEyeOff size={20}/>
              }
            </span>
          </div>
          <div className="input-button">
            <button type="submit" className={styles.button}>
                Sign up
            </button>
          </div>
        </form>
        <p className="text-center text-[#777777]">
            Already have an account? Go to <Link href={'/login'} className="font-bold">Log in</Link>
        </p>
      </section>
    </Layout>
  )
}