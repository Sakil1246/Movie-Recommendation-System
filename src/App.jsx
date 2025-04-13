import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn_out from './components/SignIn_out'
import Body from './components/Body'
import {  useDispatch, useSelector } from 'react-redux'
import  { persistor } from './utils/Store'
import { auth } from './utils/firebase'
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from './utils/userSlice'
import { removeFavourite, removeFavouriteId, removeNowPlaying, removePopular, removeTopRated, removeTrailer, removeUpcoming, removeWatchlist, removeWatchlistId } from './utils/moviesSlice'
import MovieDetails from './components/MovieDetails'
import WatchList from './components/WatchList'
import Tertiary from './components/Tertiary'
import ScrollToTop from './components/ScrollToTop'
import { removeSearch } from './utils/searchSlice'
import FavouriteMovies from './components/FavouriteMovies'
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
        dispatch(removePopular());
        dispatch(removeTopRated());
        dispatch(removeTrailer());
        dispatch(removeUpcoming());
        dispatch(removeWatchlist());
        dispatch(removeWatchlistId());
        dispatch(removeSearch());
        dispatch(removeFavouriteId());
        dispatch(removeFavourite());
        persistor.purge();

      }
    });
    return () => unsubscribe();
  }, []);


  return (
    <div>
        <BrowserRouter>
        <ScrollToTop/>
          <Routes>
            <Route path="/" element={<SignIn_out />} />
            
            <Route path="/body" element={<Body />} />
            <Route path="/tertiary/:id" element={<Tertiary />} />
            <Route path="/watchlist/:id" element={<WatchList/>} />
            <Route path="/favourite/:id" element={<FavouriteMovies/>} />
            {/* <Route path="/tertiary/:id" element={<Tertiary/>}/> */}
            
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
