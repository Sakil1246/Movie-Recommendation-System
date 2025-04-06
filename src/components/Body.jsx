import React from 'react'
import Navbar from './Navbar'

import Primary from './Primary'
import Secondary from './Secondary'
import usePopular from '../hooks/usePopular'
import useNowplaying from '../hooks/useNowplaying'
import useTopRated from '../hooks/useTopRated'
import useUpcoming from '../hooks/useUpcoming'

const Body = () => {

  useNowplaying();
  usePopular();
  useTopRated();
  useUpcoming();

  return (
    <div>
      <Navbar/>

      <Primary/>
      <div className='absolute'>
      <Secondary/>
      </div>
      
    </div>
  )
}

export default Body
