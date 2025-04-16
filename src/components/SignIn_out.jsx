import React, { useRef, useState } from 'react'
import { bgUrl } from '../utils/constants'
import validation from '../utils/validatoin';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { motion } from 'framer-motion';



const SignIn_out = () => {


  const [isSignIn, setIsSignIn] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = () => {
    const message = validation(
      email.current.value,
      password.current.value,
      fullName.current.value
    );
    if (message) {
      setError(message);
      return;
    }
  
    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
  
        updateProfile(user, {
          displayName: fullName.current.value
        })
          .then(() => {
            const { uid, email: userEmail, displayName } = auth.currentUser;
            dispatch(addUser({
              uid,
              email: userEmail,
              displayName
            }));
  
            navigate("/body");
          })
          .catch((error) => {
            setError("Profile update failed: " + error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          setError("This email is already registered.");
        } else if (errorCode === "auth/invalid-email") {
          setError("Invalid email address.");
        } else if (errorCode === "auth/weak-password") {
          setError("Password is too weak.");
        } else {
          setError("Sign up failed: " + error.message);
        }
      });
  };
  
  const handleSignIn = () => {
    if (!email.current.value) {
      setError("Email field is required.");
      return;
    }
    if (!password.current.value) {
      setError("Password field is required.");
      return;
    }
  
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/body");
      })
      .catch((error) => {
        const errorCode = error.code;
      
        if (
          errorCode === "auth/user-not-found" ||
          errorCode === "auth/wrong-password" ||
          errorCode === "auth/invalid-credential"
        ) {
          setError("Incorrect credentials.");
        } else if (errorCode === "auth/invalid-email") {
          setError("Invalid email address.");
        } else {
          setError("Sign in failed: " + error.message);
        }
      });
      
  };
  


  const handleKeyDown = (e, currentField) => {
    if (e.key === "ArrowDown") {
      if (currentField === "fullName") email.current.focus();
      else if (currentField === "email") password.current.focus();

    } else if (e.key === "ArrowUp") {
      if (currentField === "password") email.current.focus();
      else if (currentField === "email" && !isSignIn) fullName.current.focus();
    }
  };

  return (
    <div
      className='flex flex-col min-h-screen justify-center items-center'
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <h1 className='absolute top-10 text-red-500 text-6xl font-extrabold'>CiNemO</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // prevent page reload
          !isSignIn ? handleSignUp() : handleSignIn();
        }}>
        <motion.div
          key={isSignIn ? 'signIn' : 'signUp'}
          initial={{ rotateY: 180, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -180, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="bg-black shadow-lg bg-opacity-80 p-6 sm:p-8 md:p-10 w-80 sm:w-96 md:w-[420px] rounded-lg"
        >
          <h2 className="justify-center text-center text-blue-500 font-bold text-2xl sm:text-3xl mb-2">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h2>

          {!isSignIn && (
            <input
              type="text"
              placeholder="Enter your full name"
              className="border border-gray-300 bg-slate-400 px-4 sm:px-6 placeholder:text-black w-full my-3 h-11 sm:h-12 rounded-md text-sm sm:text-base"
              ref={fullName}
              onKeyDown={(e) => handleKeyDown(e, "fullName")}
            />
          )}

          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 bg-slate-400 px-4 sm:px-6 placeholder:text-black w-full my-3 h-11 sm:h-12 rounded-md text-sm sm:text-base"
            ref={email}
            onKeyDown={(e) => handleKeyDown(e, "email")}
          />

          <input
            type="password"
            placeholder={isSignIn ? "Enter your password" : "Create a password"}
            className="border border-gray-300 px-4 sm:px-6 bg-slate-400 w-full placeholder:text-black my-3 h-11 sm:h-12 rounded-md text-sm sm:text-base"
            ref={password}
            onKeyDown={(e) => handleKeyDown(e, "password")}
          />

          <p className="text-red-500 text-center text-sm">{error}</p>

          <button
            className="w-full bg-blue-500 text-white p-2 sm:p-3 rounded my-4 h-11 sm:h-12 mb-2 text-sm sm:text-base"
            onClick={!isSignIn ? handleSignUp : handleSignIn}
          >
            {!isSignIn ? "Sign Up" : "Sign In"}
          </button>

          <p className="text-slate-300 text-sm sm:text-base">
            {!isSignIn ? "Already have an account? " : "New here? "}
            <span
              className="cursor-pointer text-white"
              onClick={() => {
                setIsSignIn(!isSignIn);
                setError("");
                email.current.value = "";
                password.current.value = "";
                if (fullName.current) fullName.current.value = "";
              }}
              
            >
              {isSignIn ? "Sign Up" : "Sign In here"}
            </span>
          </p>
        </motion.div>

      </form>
    </div>
  );


}
export default SignIn_out
