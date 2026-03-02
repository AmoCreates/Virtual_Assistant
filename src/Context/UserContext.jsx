import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { createContext } from 'react'

export const UserDataContext = createContext();

const UserContext = ({children}) => {
  const [userData, setUserData] = useState();
  const [backendImg, setBackendImg] = useState();
  const [selectedImg, setSelectedImg] = useState();
  

  const handleCurrentUser = async (e) => {
        try {
          const response = await axios.get('/api/v1/user/current', { withCredentials: true });

            setUserData(response.data);
            console.log(response.data);
          
        } catch (error) {
          console.error("Signup Error:", error.response?.data || error.message);
        }
    }

    useEffect(() => {
      handleCurrentUser();
    
      
    }, [])
    

  const value = {
    userData, setUserData,
    selectedImg, setSelectedImg,
    backendImg, setBackendImg,
  };

  return (
    <div>
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext