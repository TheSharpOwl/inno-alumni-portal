import Head from "next/head";
import Layout from "components/layout/layout";
import Link from "next/link";
import styles from '../styles/Form.module.css';
import { HiOutlineUser, HiEye, HiEyeOff } from "react-icons/hi";
import { SyntheticEvent, useState } from 'react';
import { useRouter } from "next/router";

export default function Login () {
  const [show, setShow] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await fetch(
        `http://alumni.pythonanywhere.com/api-auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            username: username,
            password: password
          })
        }
      );
      
      await router.push('/')
      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Layout>
      <Head>
        <title>Alumni Portal | Login</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div>
          <h1 className="text-[#E8F0FE] text-4xl font-bold py-4">Login</h1>
        </div>
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
            <span className="icon flex items-center px-4 hover:cursor-pointer hover:text-[#6366f1]" onClick={() => setShow(!show)}>
              {show 
                ? <HiEye size={20}/> 
                : <HiEyeOff size={20}/>
              }
            </span>
          </div>
          <div className="input-button">
            <button type="submit" className={styles.button}>
                Login
            </button>
          </div>
        </form>
        <p className="text-center text-[#E8F0FE]">
            Don&apos;t have an account yet? <Link href={'/register'} className="text-[#51B112]">SignUp</Link>
        </p>
      </section>
    </Layout>
  )
}