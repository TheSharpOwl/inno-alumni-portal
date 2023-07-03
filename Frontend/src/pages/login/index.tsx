import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Head from "next/head";
import Link from "next/link";
import styles from '../../styles/form.module.css';
import { HiOutlineMail, HiEye, HiEyeOff } from "react-icons/hi";
import { useRouter } from "next/router";
import { apiEndPoint } from "../../constants";
import imgStyles from '../../styles/image.module.css';
import SuccessModal from "../../components/modals/success.modal";
import Layout from "../../components/layout/authLayout";
import { useStore, useGlobalContext } from 'context/store';
import { loginValidationSchema } from "schemaValidation";


const LoginForm = () => {
  const { isReg, setIsAuth } = useStore(); // Access the setIsAuth function from the store
  const { setToken } = useGlobalContext(); // Access the setToken function from the store

  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (values: {}, { setSubmitting, setErrors }: any) => {
    try {
      const response = await fetch(`${apiEndPoint}/api-token-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('Successful'); // Set success message
        setShowModal(true); // Show success modal
        setIsAuth(true); // Set isAuth to true
        setToken(data.token) // Set token
        setSubmitting(false);
        data && router.push(isReg ? '/confirmation' : '/dashboard'); // If for the first time route to /confirmation otherwise route to /dashboard  
      } else {
        const errorData = await response.json();
        setErrors({ password: errorData.message || errorData.non_field_errors[0]});
        setSubmitting(false);
      }
    } catch (error) {
      setErrors({ password: 'An error occurred while logging in' });
      setSubmitting(false);
    }
  };

  return (
      <Layout>
        <Head>
          <title>Alumni Portal | Log in</title>
        </Head>
        <section className="w-3/4 mx-auto flex flex-col gap-10">
          <div>
            <h1 className="text-[#40BA21] font-['Montserrat'] text-4xl font-bold pb-4">Log in</h1>
          </div>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-5">
                <div>
                  <div className={styles.input_group}>
                    <Field type="email" id="username" placeholder= "a.b@innopolis.ru" name="username" className={styles.input_text} />
                    <span className="icon flex items-center px-4">
                      <HiOutlineMail size={20}/>
                    </span>
                  </div>
                  <ErrorMessage name="username" component="div" className="text-red-500 text-left" />
                </div>

                <div>
                  <div className={styles.input_group}>
                    <Field type={`${show ? "text" : "password"}`} id="password" placeholder="password" name="password" className={styles.input_text} />
                    <span className="icon flex items-center px-4 hover:cursor-pointer hover:text-[#402F6E]" onClick={() => setShow(!show)}>
                      {show 
                        ? <HiEye size={20}/> 
                        : <HiEyeOff size={20}/>
                      }
                    </span>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-left" />
                </div>

                <div className="w-2/5 m-auto">
                  <button type="submit" disabled={isSubmitting} className={styles.button}>
                    {isSubmitting ? 'Logging in...' : 'Log in'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
  
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
              Don&apos;t have an account? Go to <Link href={'/register'} className="font-bold text-[#000] hover:text-[#40BA21] underline">SignUp</Link>
          </p>
        </section>
        {showModal && successMessage !== '' && <SuccessModal message={successMessage} onClose={() => setShowModal(false)} />}
      </Layout>
  );
};

export default LoginForm;
