import React from 'react'
import { IMG_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({path,details}) => {
 const navigate=useNavigate();
 const movieInfo=()=>{
      navigate("/movieDetails",
        {state:{details}
 });
 }

  return (
    <div className='transform  transition-transform duration-300 hover:scale-125 '
    onClick={movieInfo}
    >
      <img alt='Movie card' className='w-48 h-72 object-cover rounded-md'
      src={IMG_URL+path}
      />
    </div>
  )
}

export default MovieCard
