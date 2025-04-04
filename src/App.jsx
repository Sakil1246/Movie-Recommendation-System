import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn_out from './components/SignIn_out'
import Body from './components/Body'
import { Provider, useDispatch, useSelector } from 'react-redux'
import appStore from './utils/Store'
import { auth } from './utils/firebase'
import {  onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from './utils/userSlice'
import { removeNowPlaying, removeTrailer } from './utils/moviesSlice'
const App = () => {
  const dispatch=useDispatch();
  const user=useSelector((store)=>store.user);
  useEffect(()=>{
   const unsubscribe= onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const {uid,email,displayName,photoUrl} = user;
        //console.log(uid, email, displayName);
        dispatch(addUser({
          uid:uid,
          email:email,
          displayName:displayName,
        photoUrl:photoUrl,}
        ));
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        dispatch(removeNowPlaying());
        dispatch(removeTrailer());

      }
    });
    return ()=>unsubscribe();
  },[]);
  
  
  return (
    <div>
      {/* <Provider store={appStore}> */}
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn_out />} />
            {<Route path="/body" element={<Body />} />}

          </Routes>

        </BrowserRouter>
        </Provider>
      {/* </Provider> */}
    </div>
  )
}

export default App
