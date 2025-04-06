import React from 'react'
import Navbar from './Navbar'

import Primary from './Primary'
import Secondary from './Secondary'
import usePopular from '../hooks/usePopular'
import useNowplaying from '../hooks/useNowplaying'
import useTopRated from '../hooks/useTopRated'

const Body = () => {

  useNowplaying();
  usePopular();
  useTopRated();

  return (
    <div>
      <Navbar/>

      <Primary/>
      <Secondary/>
    </div>
  )
}

export default Body
