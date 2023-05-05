import Head from "next/head";
import Layout from "@/components/Layout/authLayOut";
import styles from '../../styles/Form.module.css';
import { SyntheticEvent, useState } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import { apiEndPoint } from "@/constants";
import ErrorModal from "@/components/Modals/error.modal";
import SuccessModal from "@/components/Modals/success.modal";


export default function Login () {
  const [codeMessage, setCodeMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post(`${apiEndPoint}/confirm/email`,
    JSON.stringify({
        code: codeMessage
    }),
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '',
      }
    },
    )
    .then(res => {
      console.log("res", res)
        if(res.status === 201 || 200) {
          setSuccessMessage('Account Confirmed!');
          setShowModal(true);
          if (!showModal) {
            const timer = setTimeout(() => {
              router.push('/login');
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
      }
    })
  }
  
  return (
    <Layout>
      <Head>
        <title>Alumni Portal | Log in</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div>
          <h1 className="text-[#40BA21] font-['Montserrat'] text-4xl font-bold py-4">Account Confirmation</h1>
        </div>
        {/* { error } */}
        <form onSubmit={submit} className="flex flex-col gap-5">
          <div>
            {/* <label>Password</label> */}
            <div className={styles.input_group}>
              <input
                type="number"
                name="code"
                placeholder="confirmation code"
                onChange={e => setCodeMessage(Math.abs(parseInt(e.target.value)))}
                min="0"
                className={styles.input_text}
                onKeyDown={e => (e.key === '-' || e.key   === '+') && e.preventDefault()}
              />
            </div>
          </div>

          {errorMessage !== '' && errorMessage !== undefined && <span className="text-red-500"> { errorMessage } </span>}
          
          <div className="w-2/5 m-auto">
            <button type="submit" className={styles.button}>
                confirm
            </button>
          </div>
        </form>
      </section>
      {showModal && serverError !== '' && <ErrorModal message={serverError} onClose={() => setShowModal(false)} />}
      {showModal && successMessage !== '' && <SuccessModal message={successMessage} onClose={() => setShowModal(false)} />}
    </Layout>
  )
}