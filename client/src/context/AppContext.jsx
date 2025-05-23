import axios from "axios";
import React, { createContext, useEffect, useState, } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider=(props)=>{

  axios.defaults.withCredentials=true

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [userData,setUserData]=useState(false);

  const getAuthState = async()=>{
    try {
      const { data } = await axios.get(backendUrl + '/api/auth/is-auth');
      if(data.success){
        setIsLoggedIn(true)
        getUserData()
      }else{
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserData(null);
      if (error.response && error.response.status !== 401) {
        toast.error(error.message || "Something went wrong");
      }
    }
  }

  const getUserData=async()=>{
    try {
      const {data}=await axios.get(backendUrl + '/api/auth/data', {
        withCredentials: true, });
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
    
  }

  useEffect(()=>{
    getAuthState();
  },[])
  const value = {
    backendUrl,
    isLoggedIn, setIsLoggedIn,
    userData, setUserData,
    getUserData
  }

  return(
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}