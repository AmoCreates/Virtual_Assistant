import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserDataContext } from '../Context/UserContext.jsx';

const Signin = () => {
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const {userData, setUserData} = useContext(UserDataContext)
  const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        try {
          const response = await axios.post('/api/v1/auth/signin', data, { withCredentials: true });
         
            setMessage(response.data.message);
            setErrMessage("");
            setUserData(response.data);
            console.log(message);
            <Navigate to={'/'}/>
          
        } catch (error) {
          const errorString = error.response?.data.message || "An unexpected error occurred";
          setErrMessage(errorString);
          setUserData(null);
          console.error("Signup Error:", error.response?.data || error.message);
        }
    }

    


  return (
    <div className='login_form text-white font-semibold h-screen w-screen flex justify-end p-24 items-center'>
      <form onSubmit={handleLogin} className='form_container flex flex-col items-center gap-4'>
        <h1 className='text-3xl mb-6'>SignIn to <span className='text-blue-500 font-bold'>Virtual Assistant</span></h1>
        <input  className='w-[350px] p-[8px] border-2 border-white rounded-full bg-transparent' type="email" placeholder='Email' name='email'/>
        <input className='w-[350px] p-[8px] border-2 border-white rounded-full bg-transparent' type="password" placeholder='Password' name='password'/>

        {errMessage && <p className='text-red-500'>*{errMessage}</p>}

        <button className='bg-white mb-5 mt-5 text-black rounded-full px-4 py-1.5 cursor-pointer'>Sign In</button>
        <h2>Create new account ? <Link to='/signup' className='text-blue-500 underline'>Sign Up</Link></h2>
      </form>
    </div>
  )
}

export default Signin