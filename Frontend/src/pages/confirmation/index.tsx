import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Head from "next/head";
import Layout from "../../components/layout/authLayout";
import styles from '../../styles/form.module.css';
import { useRouter } from "next/router";
import { apiEndPoint } from "../../constants";
import SuccessModal from "../../components/modals/success.modal";
import { useGlobalContext } from 'context/store';
import { accountConfirmationSchema } from "schemaValidation";


const ConfirmationForm = () => {
  
  const { token } = useGlobalContext();

  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (values: {}, { setSubmitting, setErrors }: any) => {
    try {
      const response = await fetch(`${apiEndPoint}/confirm/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `TOKEN ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.status);
        setShowModal(true);
        setSubmitting(false);
        if (!showModal) {
          data && router.push('/account-profile');
        }
      } else {
        const errorData = await response.json();
        setErrors({ code: errorData.status || errorData.non_field_errors[0]});
        setSubmitting(false);
      }
    } catch (error) {
      setErrors({ code: 'An error occurred while logging in' });
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Alumni Portal | Account Confirmation</title>
      </Head>
      <Formik
        initialValues={{ code: '' }}
        validationSchema={accountConfirmationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-3/4 mx-auto flex flex-col gap-10">
            <div>
              <h1 className="text-[#40BA21] font-['Montserrat'] text-4xl font-bold py-4">Account Confirmation</h1>
              <p>Use the code sent to your email to verify your account.</p>
            </div>
            <div>
              <div className={styles.input_group}>
                <Field
                  type="number"
                  name="code"
                  placeholder="Confirmation code"
                  min="0"
                  onKeyDown={(e: { key: string; preventDefault: () => any; }) => (e.key === '-' || e.key === '+') && e.preventDefault()}
                  className={styles.input_text}
                />
              </div>
              <ErrorMessage name="code" component="div" className="text-red-500 text-left" />
            </div>
            
            <div className="w-2/5 m-auto">
              <button type="submit" className={styles.button} disabled={isSubmitting}>
                {isSubmitting ? 'Confirming...' : 'Confirm'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {showModal && successMessage !== '' && <SuccessModal message={successMessage} onClose={() => setShowModal(false)} />}
    </Layout>
  );

}

export default ConfirmationForm;
