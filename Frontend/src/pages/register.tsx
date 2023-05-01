import Head from "next/head";
import Layout from "@/components/layout/authLayOut";
import styles from '../styles/Form.module.css';
import imgStyles from '../styles/Image.module.css'
import { HiOutlineMail, HiOutlineBookOpen, HiEye, HiEyeOff } from "react-icons/hi";
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
  const [errorMessage, setErrorMessage] = useState('');
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
          if(res.status !== 201) {
            setErrorMessage('Could not connect to the server')
          }
          router.push('/login')
      }).catch(err => {
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
        <title>Alumni Portal | Register</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div>
          <h1 className="text-[#40BA21] font-['Montserrat'] text-4xl font-bold py-4">Sign Up</h1>
        </div>
        {/* { error } */}
        <form onSubmit={submit} className="flex flex-col gap-5">
          <div>
            {/* <label>Email</label> */}
            <div className={styles.input_group}>
              <input 
                type="username" 
                name="username"
                placeholder="a.b@innopolis.ru"
                onChange={e => {
                  setUserName(e.target.value);
                  setErrorMessage('');
                }}
                className={styles.input_text}
              />
              <span className="icon flex items-center px-4">
                <HiOutlineMail size={20}/>
              </span>
            </div>
            {getErrorMessage('username') && <span className="text-red-500"> {getErrorMessage('username')[0].split('.')[0]} </span>}
          </div>
          {/* <div>
            <label>Diploma ID</label>
            <div className={styles.input_group}>
              <input 
                type="number" 
                name="diplomaId"
                placeholder="Diploma ID"
                onChange={e => {
                  setDiplomaId(e.target.value);
                  setErrorMessage('');
                }}
                className={styles.input_text}
              />
              <span className="icon flex items-center px-4">
                <HiOutlineBookOpen size={20}/>
              </span>
            </div>
            {getErrorMessage('diploma_id') && <span className="text-red-500"> {getErrorMessage('diploma_id')[0].split('.')[0]} </span>}
          </div> */}
          <div>
            {/* <label>Password</label> */}
            <div className={styles.input_group}>
              <input
                type={`${show.password ? "text" : "password"}`} 
                name="password"
                placeholder="password"
                onChange={e => {
                  setPassword(e.target.value);
                  setErrorMessage('');
                }}
                className={styles.input_text}
              />
              <span className="icon flex items-center px-4 hover:cursor-pointer hover:text-[#6366f1]" onClick={() => setShow({...show, password:!show.password})}>
                {show.password 
                  ? <HiEye size={20}/> 
                  : <HiEyeOff size={20}/>
                }
              </span>
            </div>
            {getErrorMessage('password') && <span className="text-red-500"> {getErrorMessage('password')[0].split('.')[0]} </span>}
          </div>
          <div>
            {/* <label>Confirm Password</label> */}
            <div className={styles.input_group}>
              <input
                type={`${show.confirmPassword ? "text" : "password"}`} 
                name="confirmPassword"
                placeholder="confirm password"
                onChange={e => {
                  setConfirmPassword(e.target.value);
                  setErrorMessage('');
                }}
                className={styles.input_text}
              />
              <span className="icon flex items-center px-4 hover:cursor-pointer hover:text-[#6366f1]" onClick={() => setShow({...show, confirmPassword:!show.confirmPassword})}>
                {show.confirmPassword 
                  ? <HiEye size={20}/> 
                  : <HiEyeOff size={20}/>
                }
              </span>
            </div>
            {getErrorMessage('password2') && <span className="text-red-500"> {getErrorMessage('password2')[0].split('.')[0]} </span>}
          </div>
          <div className="input-button">
            <button type="submit" className={styles.button}>
                Sign up
            </button>
          </div>
        </form>

        <div>

        </div>

        
        <Link href="#" className=" border-solid border-2 border-[#40BA21] rounded-md center">
          <div className="flex text-[#40BA21] font-['Montserrat'] text-l font-bold">
            <div className={imgStyles.alumni}></div>
            <h2>Innopolis University</h2>
          </div>
        </Link>
        

        <p className="text-center text-[#777777]">
            Already have an account? Go to <Link href={'/login'} className="font-bold">Log in</Link>
        </p>
      </section>
    </Layout>
  )
}