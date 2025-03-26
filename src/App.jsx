import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn_out from './components/SignIn_out'
import Body from './components/Body'
import { Provider, useDispatch } from 'react-redux'
import appStore from './utils/Store'
import { auth } from './utils/firebase'
import {  onAuthStateChanged } from "firebase/auth";
import { addUser } from './utils/userSlice'
const App = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName} = user;
        dispatch(addUser(uid,email,displayName));
      } else {
        // User is signed out
        // ...
      }
    });
  },[]);
  
  
  return (
    <div>
      {/* <Provider store={appStore}> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn_out />} />
            <Route path="/body" element={<Body />} />

          </Routes>

        </BrowserRouter>
      {/* </Provider> */}
    </div>
  )
}

export default App
