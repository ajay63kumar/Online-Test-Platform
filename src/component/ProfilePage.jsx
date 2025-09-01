
import React, { useState, useEffect, use } from 'react';

import ApiService from '../service/ApiService';
// import { useNavigate } from "react-router-dom";

import "../style/profile.css"

const ProfilePage = () => {
        const [user, setUser] = useState(null);
        const [message, setMessage] = useState(null);

        useEffect(() => {
         const fetchUserInfo = async()=>{   
          
           try{
            const userInfo = await ApiService.getLoggedInUserInfo();
            setUser(userInfo);
            console.log(userInfo)
           }
           catch(error){
             showMessage(error.response?.data?.message || "Error Login in a user: " + error.message);
           }
          };
          fetchUserInfo();
        }, []);
          const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage("");
        }, 4000);
    };

  return (
  
    // {message && <div className='message'>{message}</div>}
    <div className="profile-page">
{user && (

        <div className="profile-card">
            <h1>Hello ,{user.name}</h1>
            <div className="profile-info">
                <label htmlFor="">Name</label>
                <span>{user.name}</span>
            </div>
            <div className="profile-item">
                <label htmlFor="">Email
                </label>
                <span>{user.email}</span>

            </div>
              <div className="profile-item">
                <label htmlFor="">Phone Number 
                </label>
                <span>{user.phoneNumber}</span>
                </div>

              <div className="profile-item">
                <label htmlFor="">Role
                </label>
                <span>{user.role}</span>
                 </div>
                 
        </div>)}
    </div>
  
  )
}

export default ProfilePage
