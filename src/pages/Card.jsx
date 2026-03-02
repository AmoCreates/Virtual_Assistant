import React, { useContext } from 'react'
import { UserDataContext } from '../Context/UserContext.jsx';

const Card = ({image}) => {
  const {selectedImg, setFrontendImg, setSelectedImg, setBackendImg} = useContext(UserDataContext);

  return (
    <div className={ `card h-[350px] w-[200px] bg-white rounded-2xl overflow-hidden ${selectedImg == image ? 'selected': null}`}
    onClick={()=> {
      setSelectedImg(image)
      setBackendImg(null)
      setFrontendImg(null)
      
    }}>
      <img src={image} className='h-full w-full object-cover' />
    </div>
  )
}

export default Card
