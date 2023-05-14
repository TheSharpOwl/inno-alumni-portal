import React, { useState, useEffect } from "react";
import axios from 'axios';
import { apiEndPoint } from "../../constants";
import Avatar from "components/Features/avatar";
import EditProfileModal from "components/Features/editprofile";
import MainLayOut from "components/Layout/mainLayOut";


const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'I am a software engineer who loves to code!',
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
    name_russian: '',
    telegram: '@josebryte',
    graduation_year: 2012,
    field_of_study: 'Engineering',
    city: 'Innopolis',
    company: 'Innopolis University',
    position: 'Professor',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState('');

  const handleSave = (updatedUser: React.SetStateAction<{ name: string; email: string; bio: string; profilePic: string; name_russian: string; telegram: string; graduation_year: null; field_of_study: string; city: string; company: string; position: string; }>) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

    useEffect(() => {
        const token = localStorage.getItem("alumni-token");
        token ? setToken(token) : '';
    });

    const {data} = axios.get(`${apiEndPoint}/accounts/profile`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `TOKEN ${token}`,
        }})
        .then(res => {
        console.log("res", res)
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
    <MainLayOut>
        <div>
            <div>
                <h1>Personal data</h1>
                <div className="flex items-center">
                    <div>
                        <div>
                            <Avatar 
                                src={user.profilePic} 
                                alt={user.name} 
                                size={48} 
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <button
                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </button>
                        </div>
                        <div>
                            <button className="ml-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h1>Personal information</h1>
                <div className="flex items-center">
                    info: value
                </div>
            </div>

            <div>
                <h1>About</h1>
                <div className="flex items-center">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Interests</h3>
                        <p className="mt-2 text-gray-600"></p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Bio</h3>
                        <p className="mt-2 text-gray-600">{user.bio}</p>
                    </div>
                </div>
            </div>
            {isEditing && (
                <EditProfileModal
                    onSave={handleSave}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </div>
    </MainLayOut>
  );
};

export default Profile;