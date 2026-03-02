import React, { useContext, useState } from 'react'
import { UserDataContext } from '../Context/UserContext.jsx'
import axios from 'axios';

const Customize2 = () => {
  const [loading, setloading] = useState(false)
    const {userData, selectedImg, setUserData, backendImg} = useContext(UserDataContext);
    const [assistantName, setAssistantName] = useState(userData?.assistantName || "" );

    const handleUpdateAssistant = async () => {
      setloading(true)
      try {
        const formData = new FormData();
        formData.append('assistantName',assistantName);
        
      if (backendImg) {
        formData.append("assistantImg", backendImg); // file
      } else {
        formData.append("imageUrl", selectedImg); // text
      }

        const response = await axios.post(
          '/api/v1/user/update',
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        console.log(response.data);
        setloading(false);
        setUserData(response.data);
      } catch (error) {
        console.log("Update failed", error);
      }
    }
  return (
    <div  className='cardcontainer py-5 h-screen w-screen overflow-hidden flex flex-col gap-6 items-center justify-center bg-gradient-to-t from-black  to-[#030250]'>
      <h1 className='text-4xl text-white'>Enter Your <span className='text-blue-600 font-bold text-5xl'>Assistant</span> Name</h1>

      <input  className='assistantName w-[350px] py-[8px] px-3 border-2 border-white rounded-full bg-transparent' type="text" placeholder='Alita' name='assistantName' 
      onChange={(e) => {setAssistantName(e.target.value)}} value={assistantName}/>
        
      <button className={`${!assistantName? 'hidden': 'visible'} ${loading ? 'cursor-not-allowed' : 'cursor-pointer'} disabled:opacity-50 select bg-white text-[22px] text-black rounded-full px-6 py-1 `}
      disabled={loading} 
      onClick={()=> {
        handleUpdateAssistant()
        setloading(true)
        }}>{loading ? "Creating..." : "Finally create your assistant"}</button>
    </div>
  )
}

export default Customize2