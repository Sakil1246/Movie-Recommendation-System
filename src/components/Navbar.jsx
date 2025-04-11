import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {  signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { profileImg } from '../utils/constants';
import { toggleSearch } from '../utils/searchSlice';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector((store)=>store.user);
  const id=useSelector((store)=>store.movies.watchlistId);
const handleLogOut=()=>{

  signOut(auth).then(() => {
    // Sign-out successful.
    dispatch(removeUser());
    navigate("/");
  }).catch((error) => {
    
    console.error("Error signing out: ", error);
  });
  
 

}

const handleWatchList=()=>{
  navigate(`/watchlist/${id}`)
  setMenuOpen(false);
}

const handleSearch=()=>{
  dispatch(toggleSearch());
}
  return (
    <nav className="bg-black w-full  h-16 border-b-2 px-6 fixed top-0 shadow-lg z-50 flex items-center justify-between">
     
      <button className="text-orange-400 hover:bg-gray-700 bg-gray-800 cursor-pointer px-4 py-2 rounded-lg font-bold text-2xl"
      onClick={()=>navigate("/body")}>
        CiNemO
      </button>
      
      
      <div className="hidden md:flex text-white gap-16">
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
      
      <div className="relative flex items-center px-4 py-2 rounded-lg">
      <button className='text-white px-6 rounded-lg py-2 bg-slate-800'onClick={handleSearch   }>Search</button>

        <div className="relative" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
          <div className='hover:border-white border-4 border-transparent rounded-full p-1'>
            <img
              className="h-12 w-12 rounded-full cursor-pointer"
              src={profileImg}
              alt="profile"
            />
          </div>
          {isVisible && (
            <div 
              className="absolute left-0  w-44 h-auto bg-gray-900 rounded-lg shadow-lg bg-opacity-90"
              onMouseEnter={() => setIsVisible(true)}
              onMouseLeave={() => setIsVisible(false)}
            >
              <ul className="py-2 items-center justify-center ">
                <li className="px-4 py-2   my-4 text-white hover:bg-white hover:text-black rounded-lg cursor-pointer">Profile</li>
                <li className="px-4 py-2 my-4 text-white hover:bg-white hover:text-black rounded-lg cursor-pointer" onClick={handleWatchList}>My watchlist</li>
                <li className="px-4 py-2 text-white hover:bg-white hover:text-black rounded-lg cursor-pointer" onClick={handleLogOut}>Logout</li>
               

              </ul>
            </div>
          )}
        </div>
        {user &&<p className="ml-4 text-white hidden md:block">Welcome {user.displayName}</p>}
      </div>
    </nav>
  );
};

export default Navbar;
