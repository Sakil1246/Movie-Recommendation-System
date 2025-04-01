import React from 'react'
import useNowplaying from '../hooks/useNowplaying'

const Primary = () => {
  useNowplaying();
  return (
    <div>
      Hiii
    </div>
  )
}

export default Primary
