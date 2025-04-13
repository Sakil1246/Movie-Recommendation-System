import React from 'react'
import { useLocation } from 'react-router-dom'
import MovieDetails from './MovieDetails';
import Recommendation from './Recommendation';

const Tertiary = () => {

  const location = useLocation();
  const { details } = location.state;
  const id = details?.id;

  return (
    <div className='min-h-screen bg-black'>
      <MovieDetails details={details} />
      <Recommendation id={id} />
    </div>
  )
}

export default Tertiary
