import React from 'react'
import { IMG_URL } from '../utils/constants';

const MovieCard = ({path}) => {
 
 

  return (
    <div className=' '>
      <img alt='Movie card' className='w-48 h-48'
      src={IMG_URL+path}
      />
    </div>
  )
}

export default MovieCard
