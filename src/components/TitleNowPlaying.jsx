import React from 'react'
import MovieDetails from './MovieDetails'
import { useNavigate } from 'react-router-dom'

const TitleNowPlaying = ({title,overview,details}) => {
  const navigate=useNavigate();
  
  const handleDetails=()=>{
    navigate("/movieDetails", { state: { details } });
  }
  return (
    <div className='w-screen aspect-video pt-[5%] mt-1 px-4 md:px-20 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-5xl mt-40 font-bold w-20 pb-3 ml-10'>{title}</h1>
      <p className='text-lg w-1/4 ml-10 line-clamp-3' >{overview}</p>
      <div className='mt-3'>
        <button className='bg-white text-black ml-10 hover:bg-slate-200  font-bold py-2 px-4 rounded-md' onClick={handleDetails}>▶️Play Now</button>
        <button className='bg-slate-300 mx-3 hover:bg-slate-400 text-black font-bold py-2 px-4 rounded-md'>ℹ️More Info</button>
      </div>
    </div>
  )
}

export default TitleNowPlaying
