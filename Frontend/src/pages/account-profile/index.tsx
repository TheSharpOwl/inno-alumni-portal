import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Head from 'next/head';
import Layout from '../../components/layout/authLayout';
import styles from '../../styles/form.module.css';
import { useRouter } from 'next/router';
import { apiEndPoint } from '../../constants';
import SuccessModal from '../../components/modals/success.modal';
import { accountProfileSchema } from 'schemaValidation';
import { useGlobalContext } from 'context/store';
import { useProtectedRoute } from 'context/useProtectedRoute';

export default function AccountProfile() {
  useProtectedRoute()

  const { token } = useGlobalContext();

  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();
  const handleSubmit = async (values: {}, { setSubmitting, setErrors }: any) => {
    try {
      const response = await fetch(`${apiEndPoint}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `TOKEN ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('data: ', data);
        setSuccessMessage('Profile Created Successfully');
        setShowModal(true);
        setSubmitting(false);
        data && router.push('/dashboard'); 
      } else {
        const errorData = await response.json();
        console.log('error: ', errorData);
        setErrors({ graduation_year: errorData.status});
        setSubmitting(false);
      }
    } catch (error) {
      setErrors({ graduation_year: 'An error occurred while logging in' });
      setSubmitting(false);
    }
  }; 

  return (
    <Layout>
      <Head>
        <title>Alumni Portal | Welcome</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div>
          <h1 className="text-[#40BA21] font-['Montserrat'] text-4xl font-bold py-4">Welcome!</h1>
          <p>Please, fill the form. This will help us find your friends and offer you useful materials</p>
        </div>
        <Formik
          initialValues={{
            name: '',
            russian_name: '',
            graduation_year: '',
          }}
          validationSchema={accountProfileSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5">
              <div>
                <div className={styles.input_group}>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className={styles.input_text}
                  />
                </div>
                <ErrorMessage name="name" component="div" className="text-red-500 text-left" />
              </div>
              <div>
                <div className={styles.input_group}>
                  <Field
                    type="text"
                    name="russian_name"
                    placeholder="Russian Name"
                    className={styles.input_text}
                  />
                </div>
                <ErrorMessage name="russian_name" component="div" className="text-red-500 text-left" />
              </div>
              <div>
                <div className={styles.input_group}>
                  <Field
                    as="select"
                    name="graduation_year"
                    className={styles.input_text}
                    defaultValue=""
                  >
                    <option value="" disabled hidden>
                      Year of Graduation
                    </option>
                    {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year, index) => (
                      <option key={index} value={year}>
                        {year}
                      </option>
                    ))}
                  </Field>
                </div>
                <ErrorMessage name="graduation_year" component="div" className="text-red-500 text-left" />
              </div>
              <div className="w-2/5 m-auto">
                <button type="submit" className={styles.button} disabled={isSubmitting}>
                  {isSubmitting ? 'Confirming...' : 'Confirm'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
      {showModal && successMessage !== '' && <SuccessModal message={successMessage} onClose={() => setShowModal(false)} />}
    </Layout>
  );
}
