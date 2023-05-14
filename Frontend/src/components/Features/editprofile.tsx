import React, { useEffect, useState } from "react";
import Avatar from "./avatar";
import axios from 'axios';
import { apiEndPoint } from "../../constants";

const EditProfileModal = ({ onSave, onClose }) => {
const [user, setUser] = useState({
    name: '',
    email: '',
    bio: '',
    profilePic: '',
    name_russian: '',
    telegram: '',
    graduation_year: null,
    field_of_study: '',
    city: '',
    company: '',
    position: '',
});

const [successMessage, setSuccessMessage] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const [serverError, setServerError] = useState('');
const [showModal, setShowModal] = useState(false);
const [token, setToken] = useState('');

const handleSave = () => {
    const updatedUser = user;
    onSave(updatedUser);
};

useEffect(() => {
    const token = localStorage.getItem("alumni-token");
    token ? setToken(token) : '';
});

const {data} = axios.post(`${apiEndPoint}/update`, 
    JSON.stringify({
        name: user.name,
        name_russian: user.name_russian,
        telegram: user.telegram,
        graduation_year: user.graduation_year,
        field_of_study: user.field_of_study,
        bio: user.bio,
        city: user.city,
        company: user.company,
        position: user.position,
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
        }else {
        throw new Error('Could not connect to the server');
        }
        
    }).catch(function(err) { 
        if(err.response && err.response.status === 400 || 402) {
            setErrorMessage(err.response.data.status);
        }else if(err.response && err.response.status === 500) {
            setServerError(err.response.statusText);
            setShowModal(true);
        }else {
            setServerError(err.message);
            setShowModal(true);
        }
});

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
                <Avatar 
                    src={user.profilePic} 
                    alt={user.name} 
                    size={48} 
                />
              <div className="mt-4 sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Profile</h3>
                <div className="mt-2">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Name"
                      value={user.name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={user.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="bio">
                      Bio
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="bio"
                      placeholder="Bio"
                      value={user.bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="profilePic">
                      Profile Picture
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="profilePic"
                      type="url"
                      placeholder="Profile Picture URL"
                      value={user.profilePic}
                      onChange={(e) => setProfilePic(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;