import React, { useState, useEffect } from "react";
import axios from 'axios';
import { apiEndPoint } from "../../constants";
import Avatar from "../../components/features/avatar";
import EditProfileModal from "../../components/features/editprofile";
import MainLayOut from "../../components/layout/mainLayout";
import { HiUserCircle } from "react-icons/hi";


const Profile = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');

    const handleSave = (updatedUser: React.SetStateAction<{ name: string; email: string; bio: string; profilePic: string; name_russian: string; telegram: string; graduation_year: null; field_of_study: string; city: string; company: string; position: string; }>) => {
        setUser(updatedUser);
        setIsEditing(false);
    };

    const userProfile = async (token) => {
        await axios.get(`${apiEndPoint}/accounts/profile`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `TOKEN ${token}`,
            }})
            .then(res => {
                setUser(res.data);
            }).catch(function(err) {
                console.log('Error: ', err);
            }
        );
    }
    console.log('user', user)

    useEffect(() => {
        const token = localStorage.getItem("alumni-token");
        setToken(token);
        userProfile(token);
    }, []);

  return (
    <MainLayOut>
        <div>
            <h1 className="text-[#40BA21] text-3xl font-bold">Personal data</h1>
            <div className="my-8">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center">
                        <div className="mr-4">
                            {
                                user.profilePic ?
                                <Avatar 
                                    src={user.profilePic}
                                    alt={user.name}
                                    size={48} 
                                /> :
                                <div className="text-[#40BA21]"><HiUserCircle size={96}/></div>
                            }
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-[#202020]">{user.name}</h1>
                            <h3 className="text-lg font-semibold text-[#202020]">{user.name_russian}</h3>
                            <p>{user.email}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <button
                                className="px-4 py-2 text-[#40BA21] border-solid border-[#40BA21] border-2 rounded hover:bg-[#40BA21] hover:text-white"
                                onClick={() => setIsEditing(true)}
                            >
                                EDIT INFORMATION
                            </button>
                        </div>
                        <div>
                            <button className="mt-4 hover:text-[#40BA21] underline">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-8">
                <h1 className="text-2xl font-bold">Personal information</h1>
                <div className="border h-[120px] my-4">
                    <div className="flex flex-wrap justify-between mx-8 my-4">
                        <div>
                            <h1>Degree</h1>
                            <p className="mt-4 font-bold text-[#12152A] text-center">{user.filed_of_study || 'Field of Study'}</p>
                        </div>
                        <div>
                            <h1>Date of graduation</h1>
                            <p className="mt-4 font-bold text-[#12152A] text-center">{user.graduation_year || 'YYYY'}</p>
                        </div>
                        <div>
                            <h1>Place of work</h1>
                            <p className="mt-4 font-bold text-[#12152A] text-center">{user.company || 'Company Name'}</p>
                        </div>
                        <div>
                            <h1>Position</h1>
                            <p className="mt-4 font-bold text-[#12152A] text-center">{user.position || 'Work Position'}</p>
                        </div>
                        <div>
                            <h1>Current city</h1>
                            <p className="mt-4 font-bold text-[#12152A] text-center">{user.city || 'City'}</p>
                        </div>
                        <div>
                            <h1>Telegram</h1>
                            <p className="mt-4 font-bold text-[#12152A] text-center">{user.telegram || '@Username'}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-8">
                <h1 className="text-2xl font-bold">About</h1>
                <div className="border h-[120px] my-4">
                    <div className="flex items-center overflow-y-auto mx-4">
                        <p className="mt-2 text-gray-600">{user.bio || 'Please tell us about yourself...'}</p>
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