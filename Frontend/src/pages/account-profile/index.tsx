import Head from "next/head";
import Layout from "components/layout/authLayout";
import styles from '../../styles/form.module.css';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import { apiEndPoint } from "constants";
import ErrorModal from "components/modals/error.modal";
import SuccessModal from "components/modals/success.modal";


export default function AccountProfile () {
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    russian_name: "",
    graduation_year: "",
  });

  const [errorMessages, setErrorMessages] = useState({});

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [serverError, setServerError] = useState('');

  const [showModal, setShowModal] = useState(false);

  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Full Name is required";
    }
    if (!formData.russian_name) {
      errors.russian_name = "Full Name in Russian is required";
    }
    if (!formData.graduation_year) {
      errors.graduation_year = "Graduation Year is required";
    }
    setErrorMessages(errors);
  }, [formData]);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    if(name === 'graduation_year') { value = parseInt(value) }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("alumni-token");
    token ? setToken(token) : '';
  }, []);
  
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // Check if there are any validation errors
    if (Object.keys(errorMessages).length !== 0) {
        return;
    }

    // Submit the form
    await axios.post(`${apiEndPoint}/update`,
    JSON.stringify({
        name: formData.name,
        name_russian: formData.russian_name,
        graduation_year: formData.graduation_year,
    }),
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `TOKEN ${token}`,
      }
    },
    )
    .then(res => {
      // console.log("res", res)
        if(res.status === 201 || 200) {
          setSuccessMessage(res.data.status);
          setShowModal(true);
          if (!showModal) {
            const timer = setTimeout(() => {
              router.push('/dashboard');
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
        <title>Alumni Portal | Welcome</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div>
          <h1 className="text-[#40BA21] font-['Montserrat'] text-4xl font-bold py-4">Welcome!</h1>
          <p>Please, fill some forms. This will help us find your friends and offer you useful materials</p>
        </div>
        {/* { error } */}
        <form onSubmit={submit} className="flex flex-col gap-5">
            <div>
                {/* <label>Password</label> */}
                <div className={styles.input_group}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        onChange={handleInputChange}
                        className={styles.input_text}
                    />
                </div>
                {showError && errorMessages.name && <span className="text-red-500"> {errorMessages.name} </span>}
            </div>
            <div>
                <div className={styles.input_group}>
                    <input
                        type="text"
                        name="russian_name"
                        placeholder="Russian Name"
                        onChange={handleInputChange}
                        className={styles.input_text}
                    />
                </div>
                {getErrorMessage('name_russian') && <span className="text-red-500"> {getErrorMessage('name_russian')[0].split('.')[0]} </span>}
                {showError && errorMessages.russian_name && <span className="text-red-500"> {errorMessages.russian_name} </span>}
            </div>
            <div>
                <div className={styles.input_group}>
                    <select
                        name="graduation_year"
                        onChange={handleInputChange}
                        className={styles.input_text}
                        defaultValue=""
                    >
                        <option value="" disabled hidden>Year of Graduation</option>
                        {
                            Array.from({length: 50}, (_, i) => new Date().getFullYear() - i).map((year, index) => <option key={index} value={year}>{year}</option>)
                        }
                    </select>
                </div>
                {showError && errorMessages.graduation_year && <span className="text-red-500"> {errorMessages.graduation_year} </span>}
            </div>

          {errorMessage !== '' && errorMessage !== undefined && <span className="text-red-500"> { errorMessage } </span>}
          
          <div className="w-2/5 m-auto">
            <button type="submit" className={styles.button} onClick={() => setShowError(true)}>
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