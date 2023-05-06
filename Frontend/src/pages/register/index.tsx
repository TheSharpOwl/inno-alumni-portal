import Head from "next/head";
import Layout from "@/components/Layout/authLayOut";
import styles from '../../styles/Form.module.css';
import imgStyles from '../../styles/Image.module.css';
import { 
  HiOutlineMail,
  HiEye, 
  HiEyeOff 
} from "react-icons/hi";
import { SyntheticEvent, useState } from 'react';
import Link from "next/link";
import { PasswordCredential } from "@/interfaces";
import { useRouter } from "next/router";
import axios from 'axios';
import { apiEndPoint } from "@/constants";
import ErrorModal from "@/components/Modals/error.modal";
import SuccessModal from "@/components/Modals/success.modal";


export default function Register () {
  const [show, setShow] = useState<PasswordCredential>({password: false, confirmPassword: false});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();


  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post(`${apiEndPoint}/register`,
      JSON.stringify({
        email: email,
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
          if(res.status === 201 || 200) {
            setSuccessMessage('Registered Successfully!');
            setShowModal(true);
            if (!showModal) {
              const timer = setTimeout(() => {
                router.push('/login');
              }, 1000);
              return () => clearTimeout(timer);
            }
          }else {
            setErrorMessage('Could not connect to the server');
          }

      }).catch(err => {
        if(err.response && err.response.status === 400) {
          setErrorMessage(err.response.data);
        }else if(err.response && err.response.status === 500){
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
        <title>Alumni Portal | Register</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-5">
        <div>
          <h1 className="text-[#40BA21] font-['Montserrat'] text-4xl font-bold pb-4">Sign Up</h1>
        </div>
        {/* { error } */}
        <form onSubmit={submit} className="flex flex-col gap-5">
          <div>
            {/* <label>Email</label> */}
            <div className={styles.input_group}>
              <input 
                type="email" 
                name="Email"
                placeholder="a.b@innopolis.ru"
                onChange={e => {
                  setEmail(e.target.value);
                  setErrorMessage('');
                }}
                className={styles.input_text}
              />
              <span className="icon flex items-center px-4">
                <HiOutlineMail size={20}/>
              </span>
            </div>
            {getErrorMessage('email') && <span className="text-red-500"> {getErrorMessage('email')[0].split('.')[0]} </span>}
          </div>
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
          <div className="w-2/5 m-auto">
            <button type="submit" className={styles.button}>
                Sign up
            </button>
          </div>
        </form>

        <div className="flex items-center">
          <div className="flex-1 h-0.5 bg-[#B7D4E8]"></div>
          <div className="px-4"> or sign up with </div>
          <div className="flex-1 h-0.5 bg-[#B7D4E8]"></div>
        </div>
        
        <Link href="#" className="border-solid border-2 border-[#40BA21] rounded-lg w-60 h-8 m-auto">
          <div className="flex text-[#40BA21] font-['Montserrat'] text-l font-bold pt-1">
            <div className="m-auto"><div className={imgStyles.alumni}></div></div>
            <div className="m-auto">Innopolis University</div>
          </div>
        </Link>
        

        <p className="text-center text-[#777]">
            Already have an account? Go to <Link href={'/login'} className="font-bold text-[#000]">Login</Link>
        </p>
      </section>
      {showModal && serverError !== '' && <ErrorModal message={serverError} onClose={() => setShowModal(false)} />}
      {showModal && successMessage !== '' && <SuccessModal message={successMessage} onClose={() => setShowModal(false)} />}
    </Layout>
  )
}