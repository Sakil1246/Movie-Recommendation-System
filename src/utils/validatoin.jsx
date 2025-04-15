import React from 'react'

const validation = (email,password,fullName) => {
  const isPassword = /^[a-zA-Z0-9]{4,}$/.test(password);

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
 
  if(fullName =="") return "Name can't  be empty";
  if(email === "") return "Email can't be empty";
  if(password === "") return "Password can't be empty";
  if(!isEmail) return "Email is not valid";
  if(!isPassword) return "Password is not strong";
  
  else return null;
}

export default validation
