import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn_out from './components/SignIn_out'
import Body from './components/Body'
import { Provider, useDispatch, useSelector } from 'react-redux'
import appStore, { persistor } from './utils/Store'
import { auth } from './utils/firebase'
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from './utils/userSlice'
import { removeNowPlaying, removeTrailer } from './utils/moviesSlice'
const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const { uid, email, displayName, photoUrl } = firebaseUser;
        //console.log(uid, email, displayName);
        dispatch(addUser({
          uid: uid,
          email: email,
          displayName: displayName,
          photoUrl: photoUrl,
        }
        ));
      } else {
        // User is signed out

        dispatch(removeUser());
        dispatch(removeNowPlaying());
        dispatch(removeTrailer());
        persistor.purge();

      }
    });
    return () => unsubscribe();
  }, []);


  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn_out />} />
            {<Route path="/body" element={<Body />} />}
          </Routes>
        </BrowserRouter>

    </div>
  )
}

export default App
