import Head from "next/head";
import Layout from "components/layout/layout";
import styles from '../styles/Form.module.css';
import { HiOutlineUser, HiOutlineBookOpen, HiEye, HiEyeOff } from "react-icons/hi";
import { useEffect, SyntheticEvent, useState } from 'react';
import Link from "next/link";
import { PasswordCredential } from "interfaces";
import { useRouter } from "next/router";

export default function Register () {
  const [show, setShow] = useState<PasswordCredential>({password: false, confirmPassword: false});
  const [csrfToken, setCsrf] = useState('');
  const [username, setUserName] = useState('');
  const [diplomaId, setDiplomaId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('https://alumni.pythonanywhere.com/csrf',
    {
      credentials: 'include',
    })
    .then((res) => {
      let csrfToken = res.headers.get("X-CSRFToken");
      setCsrf(csrfToken!);
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await fetch(
        'https://alumni.pythonanywhere.com/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          body: JSON.stringify({
            username: username,
            diploma_id: diplomaId,
            password: password,
            password2: confirmPassword
          })
        })
        .then(res => {
          if(!res.ok) {
            throw new Error('Could not connect to the server')
          }
        })
        await router.push('/login')
        .catch (err => {
          setError(err);
        })

    } catch (err) {
      console.log(err)
    }
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
                SignUp
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