import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { options } from '../utils/constants'

const Body = () => {

  const nowPlaying=async ()=>{
    const data=await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',options);
    const json=await data.json();
    console.log(json);
  }
  useEffect(()=>{
    nowPlaying();
  },[]);
  return (
    <div>
      <Navbar/>
    </div>
  )
}

export default Body
