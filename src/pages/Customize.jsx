import Card from './Card.jsx'
import avios from '../assets/elli.avif'
import lame from '../assets/lame.avif'
import rouv from '../assets/rouv.jpg'
import sesi from '../assets/sesi.jpg'
import siera from '../assets/siera.webp'
import lisa from '../assets/lisa.jpg'
import jarvis from '../assets/VA_Jarvis.png'
import { RiImageAddFill } from "react-icons/ri";
import { useContext, useRef, useState } from 'react'
import { UserDataContext } from '../Context/UserContext.jsx'
import { Link } from 'react-router-dom'


const Customize = () => {
  const inputImgRef = useRef();
  const [frontendImg, setFrontendImg] = useState([avios, sesi, lame, rouv, siera, jarvis, lisa]);

  const {selectedImg, setSelectedImg, setBackendImg} = useContext(UserDataContext);

  const imgaes=[
    avios, sesi, lame, rouv, siera, jarvis, lisa
  ]

  const handleImg = (e) => {
    const file = e.target.files[0];
    setBackendImg(file);
    setFrontendImg(prev => [...prev, URL.createObjectURL(file)]);
  }
  
  return (
    
    <div className='cardcontainer py-5 h-screen w-screen overflow-hidden flex flex-col  items-center justify-evenly bg-gradient-to-t from-black  to-[#030250]'>

        <h1 className='text-4xl text-white'>Select Your <span className='text-blue-600 font-bold text-5xl'>Assistant</span> Image</h1>

        <div className=' p-2 overflow-y-auto flex gap-6 flex-wrap justify-center '>
          <div className='relative card h-[350px] w-[200px] cursor-pointer text-3xl text-white flex justify-center items-center bg-[#ffffff23] rounded-2xl overflow-hidden ' onClick={()=> {inputImgRef.current.click()}}>
            <RiImageAddFill />
            <input className='absolute -z-1' ref={inputImgRef} type="file" onChange={ handleImg }/>
          </div>

            {[...frontendImg].reverse().map( function (elem, key) {
              return ( 
                <Card key={key} image={elem} />
              ) 
            })}
          </div>
          
        <div><Link to='/customize2' className={`${!selectedImg ? 'hidden' : 'visible'} select bg-white mb-5 mt-5 text-[22px] text-black rounded-full px-6 py-1 cursor-pointer`}
        >Next</Link></div>
    
    </div>
  )
}

export default Customize