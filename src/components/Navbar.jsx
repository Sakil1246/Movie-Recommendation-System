import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { profileImg, SEARCH_ICON } from '../utils/constants';
import { toggleSearch } from '../utils/searchSlice';
import useGetFavourite from '../hooks/useGetFavourite';
import useGetWatchlist from '../hooks/useGetWatchlist';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const Name = (user?.displayName || "").split(" ")[0];
  useGetFavourite({userId: user?.uid});
  useGetWatchlist({userId: user?.uid});
  const wid = useSelector((store) => store.movies.watchlistId);
  const fid=useSelector((store)=>store.movies.favouriteId)
  const isSearch = useSelector((store) => store.isSearch);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  const handleWatchList = () => {
    navigate(`/watchlist/${wid}`);
    setMenuOpen(false);
  };

  const handleSearch = () => {
    dispatch(toggleSearch());
  };

  const handleFavourite=()=>{
    navigate(`/favourite/${fid}`);
    setMenuOpen(false);
  }

  return (
    <nav className="bg-black w-full h-16 border-b-2 px-4 md:px-6 fixed top-0 shadow-lg z-50 flex items-center justify-between flex-wrap">
  
  <div className="flex items-center gap-4">
    {!isSearch && (
      <button
        className="text-orange-400 hover:bg-gray-700 cursor-pointer px-4 py-2 rounded-lg font-bold text-xl sm:text-2xl"
        onClick={() => navigate("/body")}
      >
        CiNeMo
      </button>
    )}
  </div>

  
  {!isSearch && (
    <div className="hidden md:flex text-white items-center gap-12 justify-center flex-1">
      <Link to="/body" className="hover:text-orange-400 transition">Home</Link>
      <Link to="/body" className="hover:text-orange-400 transition">About</Link>
      <Link to="/body" className="hover:text-orange-400 transition">Contact</Link>
    </div>
  )}

  
  {!isSearch && (
    <div className="flex md:hidden ml-auto">
      <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  )}

 
  {menuOpen && !isSearch && (
    <div className="w-full md:hidden mt-2 bg-black p-4 text-white space-y-2">
      <Link to="/body" className="block text-center py-2 hover:bg-gray-700" onClick={() => setMenuOpen(false)}>Home</Link>
      <Link to="/about" className="block text-center py-2 hover:bg-gray-700" onClick={() => setMenuOpen(false)}>About</Link>
      <Link to="/contact" className="block text-center py-2 hover:bg-gray-700" onClick={() => setMenuOpen(false)}>Contact</Link>
    </div>
  )}

  
  <div className="flex items-center gap-3 mt-2 md:mt-0 ml-auto">
    <button
      className={`text-white px-4 md:px-6 rounded-lg py-2 hover:rounded-2xl flex items-center gap-2 text-sm md:text-base ${isSearch ? "bg-slate-800 hover:bg-slate-600" : "bg-black"}`}
      onClick={handleSearch}
    >
      {!isSearch ? (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
        </svg>
      ) : (
        "Back"
      )}
    </button>

    <button
      className="text-white px-4 md:px-6 rounded-lg py-2 hover:rounded-2xl flex items-center gap-2"
      onClick={handleFavourite}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="30" fill="none" stroke="#ffffff" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
      2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 
      3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 
      3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>

    
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="hover:border-white border-4 border-transparent rounded-full p-1">
        <img className="h-10 w-10 rounded-full cursor-pointer" src={profileImg} alt="profile" />
      </div>
      {isVisible && (
        <div
          className="absolute right-0 w-44 bg-gray-900 rounded-lg shadow-lg bg-opacity-90"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <ul className="py-2 flex flex-col">
            <li className="px-4 py-2 my-2 text-white hover:bg-white hover:text-black rounded-lg cursor-pointer" onClick={handleWatchList}>
              My watchlist
            </li>
            <li className="px-4 py-2 my-2 text-white hover:bg-white hover:text-black rounded-lg cursor-pointer" onClick={handleLogOut}>
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>

    
    {user && (
      <p className="hidden md:block text-white text-sm lg:text-base ml-2">Welcome {Name}</p>
    )}
  </div>
</nav>

  );
};

export default Navbar;
