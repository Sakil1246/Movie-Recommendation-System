import React from 'react'
import Navbar from './Navbar'

import Primary from './Primary'
import Secondary from './Secondary'
import usePopular from '../hooks/usePopular'
import useNowplaying from '../hooks/useNowplaying'
import useTopRated from '../hooks/useTopRated'
import useUpcoming from '../hooks/useUpcoming'
import Footer from './Footer'
import useGetWatchlist from '../hooks/useGetWatchlist'
import { useSelector } from 'react-redux'

const Body = () => {
  const uid=useSelector((store) => store.user?.uid);
  useNowplaying();
  usePopular();
  useTopRated();
  useUpcoming();
  useGetWatchlist({userId:uid});

  return (
    <div className='min-h-screen bg-black'>
      <Navbar/>

      <Primary/>
      
      <Secondary/>
      
      <Footer/>
    </div>
  )
}

export default Body
