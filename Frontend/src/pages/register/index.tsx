import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Head from "next/head";
import styles from '../../styles/Form.module.css';
import imgStyles from '../../styles/Image.module.css';
import { 
  HiOutlineMail,
  HiEye, 
  HiEyeOff 
} from "react-icons/hi";
import Link from "next/link";
import { PasswordCredential } from "../../interfaces";
import { useRouter } from "next/router";
import { apiEndPoint } from "../../constants";
import SuccessModal from "../../components/modals/success.modal";
import Layout from "../../components/layout/authLayOut";
import { registerValidationSchema } from 'SchemaValidation';


const SignupForm = () => {
  const [show, setShow] = useState<PasswordCredential>({password: false, password2: false});
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
  
  const handleSubmit = async (values: {}, { setSubmitting, setErrors }: any) => {
    try {
      const response = await fetch(`${apiEndPoint}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('success', response, data);
        setSuccessMessage(data.message); // Set success message
        setShowModal(true); // Show success modal
        setSubmitting(false);
        if (!showModal) {
          const timer = setTimeout(() => {
            router.push('/login');
          }, 1000);
          return () => clearTimeout(timer);
        }
      } else {
        const errorData = await response.json();
        console.log('error', errorData);
        setErrors({ password2: errorData.message });
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ password2: 'An error occurred while signing up' });
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Alumni Portal | Register</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-5">
        <div>
          <h1 className="text-[#40BA21] font-['Montserrat'] text-4xl font-bold pb-4">Sign Up</h1>
        </div>
        <Formik
          initialValues={{ email: '', password: '', password2: '' }}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5">
              <div>
                <div className={styles.input_group}>
                  <Field type="email" id="email" placeholder="a.b@innopolis.ru" name="email" className={styles.input_text} />
                  <span className="icon flex items-center px-4">
                    <HiOutlineMail size={20}/>
                  </span>
                </div>
                <span className="text-red-500 text-left">
                  <ErrorMessage name="email" component="div" className="error" />
                </span>
              </div>


              <div>
                <div className={styles.input_group}>
                  <Field type={`${show.password ? "text" : "password"}`} id="password" placeholder="password" name="password" className={styles.input_text} />
                  <span className="icon flex items-center px-4 hover:cursor-pointer hover:text-[#6366f1]" onClick={() => setShow({...show, password:!show.password})}>
                    {show.password 
                      ? <HiEye size={20}/> 
                      : <HiEyeOff size={20}/>
                    }
                  </span>
                </div>
                <span className="text-red-500 text-left">
                  <ErrorMessage name="password" component="div" className="error" />
                </span>
              </div>

              <div>
                <div className={styles.input_group}>
                  <Field type={`${show.password2 ? "text" : "password"}`} id="password2" placeholder="confirm password" name="password2" className={styles.input_text} />
                  <span className="icon flex items-center px-4 hover:cursor-pointer hover:text-[#6366f1]" onClick={() => setShow({...show, password2:!show.password2})}>
                    {show.password2
                      ? <HiEye size={20}/> 
                      : <HiEyeOff size={20}/>
                    }
                  </span>
                </div>
                <span className="text-red-500 text-left">
                  <ErrorMessage name="password2" component="div" className="error" />
                </span>
              </div>
              
              <div className="w-2/5 m-auto">
                <button type="submit" disabled={isSubmitting} className={styles.button}>
                    Sign up
                </button>
              </div>
            </Form>
          )}
        </Formik>

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
            Already have an account? Go to <Link href={'/login'} className="font-bold text-[#000] hover:text-[#40BA21] underline">Login</Link>
        </p>
      </section>
      {showModal && successMessage !== '' && <SuccessModal message={successMessage} onClose={() => setShowModal(false)} />}
    </Layout>
  );
};

export default SignupForm;
    