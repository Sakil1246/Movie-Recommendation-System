import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { profileImg, SEARCH_ICON } from '../utils/constants';
import { toggleSearch } from '../utils/searchSlice';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const Name = (user?.displayName || "").split(" ")[0];
  
  const id = useSelector((store) => store.movies.watchlistId);
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
    navigate(`/watchlist/${id}`);
    setMenuOpen(false);
  };

  const handleSearch = () => {
    dispatch(toggleSearch());
  };

  return (
    <nav className="bg-black w-full h-16 border-b-2 px-6 fixed top-0 shadow-lg z-50 flex items-center justify-between">
      <div className="flex items-center  justify-center gap-6">
      {!isSearch && (
        
          <button
            className="text-orange-400 hover:bg-gray-700 bg-gray-800 cursor-pointer px-4 py-2 rounded-lg font-bold text-2xl"
            onClick={() => navigate("/body")}
          >
            CiNeMo </button>
          )}
        </div>
           <div className=''>
            {!isSearch &&(
              <>
          <div className="hidden md:flex text-white items-center   gap-16 justify-center w-full">
            <Link to="/body" className="hover:text-orange-400 transition">Home</Link>
            <Link to="/about" className="hover:text-orange-400 transition">About</Link>
            <Link to="/contact" className="hover:text-orange-400 transition">Contact</Link>
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {menuOpen && (
            <div className="absolute top-16 left-0 w-full bg-black p-4 flex flex-col items-center text-white md:hidden">
              <Link to="/" className="py-2 w-full text-center hover:bg-gray-700" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/about" className="py-2 w-full text-center hover:bg-gray-700" onClick={() => setMenuOpen(false)}>About</Link>
              <Link to="/contact" className="py-2 w-full text-center hover:bg-gray-700" onClick={() => setMenuOpen(false)}>Contact</Link>
            </div>
          )}
          </>
        )}
        </div>
       

      <div className="relative flex items-center justify-end right-0  px-4 py-2 rounded-lg">
      <button
  className={`text-white px-6 rounded-lg py-2 hover:rounded-2xl  ${isSearch? "bg-slate-800 hover:bg-slate-600":"bg-black"} flex items-center gap-2`}
  onClick={handleSearch}
>
  {!isSearch ? (
    <svg
      
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
      />
    </svg>
  ) : (
    "Back"
  )}
</button>


        <div
          className="relative ml-4"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <div className="hover:border-white border-4 border-transparent rounded-full p-1">
            <img
              className="h-12 w-12 rounded-full cursor-pointer"
              src={profileImg}
              alt="profile"
            />
          </div>

          {isVisible && (
            <div
              className="absolute left-0 w-44 bg-gray-900 mr-0  rounded-lg shadow-lg bg-opacity-90"
              onMouseEnter={() => setIsVisible(true)}
              onMouseLeave={() => setIsVisible(false)}
            >
              <ul className="py-2 flex flex-col ">
                <li className="px-4 py-2 my-2 text-white hover:bg-white hover:text-black rounded-lg cursor-pointer">
                  Profile
                </li>
                <li
                  className="px-4 py-2 my-2 text-white hover:bg-white hover:text-black rounded-lg cursor-pointer"
                  onClick={handleWatchList}
                >
                  My watchlist
                </li>
                <li
                  className="px-4 py-2 my-2 text-white hover:bg-white hover:text-black rounded-lg cursor-pointer"
                  onClick={handleLogOut}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {user && (
          <p className="ml-4 text-white hidden md:block">
            Welcome {Name}
          </p>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
