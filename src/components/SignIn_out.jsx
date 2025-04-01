import React, { useRef, useState } from 'react'
import { bgUrl } from '../utils/constants'
import validation from '../utils/validatoin';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';



const SignIn_out = () => {


    const [isSignIn, setIsSignIn] = useState(false);


    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const fullName = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignUp = () => {
        const message = validation(email.current.value, password.current.value, fullName.current.value);
        // console.log(email.current.value);
        setError(message);
        if (message) return;
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
                //console.log(user);
                updateProfile(auth.currentUser, {
                    displayName: fullName.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
                  }).then(() => {
                    // Profile updated!
                    // ...
                    const {uid,email,displayName} = auth.currentUser;
                            //console.log(uid, email, displayName);
                            dispatch(addUser({
                              uid:uid,
                              email:email,
                              displayName:displayName}
                            ));
                  }).catch((error) => {
                    // An error occurred
                    // ...
                  });
                  
                 navigate("/body");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                setError(errorCode + ": " + errorMessage);
            });
    }
    const handleSignIn = () => {

        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                // ...
                //dispatch(addUser(user));
                 navigate("/body");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorCode + ": " + errorMessage);
            });


    }



    return (
        <div className=' flex flex-col min-h-screen justify-center items-center '
            style={{ backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

            <h1 className='absolute top-10 text-red-500 text-6xl font-extrabold'>CiNemO</h1>

            <div className='bg-black shadow-lg bg-opacity-80 p-10 w-96 rounded-lg '>
                <h2 className='justify-center text-center text-blue-500 font-bold text-2xl'>{isSignIn ? "Sign In" : "Sign Up"}</h2>
                {!isSignIn &&
                    <>
                        <input type='text' placeholder='Enter your full name' className=' border border-gray-300  bg-slate-400  px-6 placeholder:text-black  w-full my-4 h-12 rounded-md'
                            ref={fullName}
                        />
                    </>
                }
                <input type='email' placeholder='Enter your email' className=' border border-gray-300 bg-slate-400 w-full placeholder:text-black px-6 my-4 h-12 rounded-md'
                    ref={email}

                />

                <input type='password' placeholder={isSignIn ? 'Enter your password' : "Create a password"} className='border border-gray-300 px-6 bg-slate-400 w-full placeholder:text-black   my-4 h-12 rounded-md'

                    ref={password}
                />
                <p className="text-red-500 text-center">{error}</p>
                <button className="w-full bg-blue-500 text-white p-2 rounded my-4 h-12 mb-2" onClick={!isSignIn ? handleSignUp : handleSignIn}>
                    {!isSignIn ? "Sign Up" : "Sign In"}
                </button>
                <p className='text-slate-300'>{!isSignIn ? "Already have an account? " : "New here? "}
                    <span className='cursor-pointer text-white' onClick={() => setIsSignIn(!isSignIn)}>
                        {isSignIn ? "Sign Up " : "Sign In here"}
                    </span>
                </p>
            </div>
        </div>
    )

}
export default SignIn_out
