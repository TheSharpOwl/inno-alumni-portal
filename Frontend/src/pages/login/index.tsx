import Head from "next/head";
import Layout from "@../../components/layout/authLayOut";
import Link from "next/link";
import styles from '../../styles/Form.module.css';
import { HiOutlineMail, HiEye, HiEyeOff } from "react-icons/hi";
import { SyntheticEvent, useState } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import { apiEndPoint } from "../../constants";
import imgStyles from '../../styles/Image.module.css';
import ErrorModal from "../../components/modals/error.modal";
import SuccessModal from "../../components/modals/success.modal";


export default function Login () {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();


  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post(`${apiEndPoint}/api-token-auth`,
    JSON.stringify({
      username: email,
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
      // console.log("res", res)
        if(res.status === 201 || 200) {
          setSuccessMessage('Login Successful!');
          setShowModal(true);
          localStorage.setItem("alumni-token", res.data.token)
          if (!showModal) {
            const timer = setTimeout(() => {
              router.push('/confirmation'); // If for the first time route to /confirmation otherwise route to /dashboard
            }, 1000);
            return () => clearTimeout(timer);
          }
        }else {
            throw new Error('Could not connect to the server');
        }
        
    }).catch(function(err) {
      if(err.response && err.response.status === 400) {
        setErrorMessage(err.response.data);
      }else if(err.response && err.response.status === 500) {
        setServerError(err.response.statusText);
        setShowModal(true);
      }else {
        setServerError(err.message);
        setShowModal(true);
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
          <h1 className="text-[#40BA21] font-['Montserrat'] text-4xl font-bold pb-4">Log in</h1>
        </div>
        {/* { error } */}
        <form onSubmit={submit} className="flex flex-col gap-5">
          <div>
            {/* <label>Email</label> */}
            <div className={styles.input_group}>
              <input 
                type="email"
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
          
          <div className="w-2/5 m-auto">
            <button type="submit" className={styles.button}>
                Log in
            </button>
          </div>
        </form>

        <div className="flex items-center">
          <div className="flex-1 h-0.5 bg-[#B7D4E8]"></div>
          <div className="px-4"> or log in with </div>
          <div className="flex-1 h-0.5 bg-[#B7D4E8]"></div>
        </div>
        
        <Link href="#" className="border-solid border-2 border-[#40BA21] rounded-lg w-60 h-8 m-auto">
          <div className="flex text-[#40BA21] font-['Montserrat'] text-l font-bold pt-1">
            <div className="m-auto"><div className={imgStyles.alumni}></div></div>
            <div className="m-auto">Innopolis University</div>
          </div>
        </Link>

        <p className="text-center text-[#777]">
            Don&apos;t have an account? Go to <Link href={'/register'} className="font-bold text-[#000]">SignUp</Link>
        </p>
      </section>
      {showModal && serverError !== '' && <ErrorModal message={serverError} onClose={() => setShowModal(false)} />}
      {showModal && successMessage !== '' && <SuccessModal message={successMessage} onClose={() => setShowModal(false)} />}
    </Layout>
  )
}