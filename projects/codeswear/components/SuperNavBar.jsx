"use client"
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import { pathToFileURL } from "url";

function SuperNavBar() {
  
  const pathName = usePathname()
  const [user,setUser] = useState({value:null})
  const [key,setKey] = useState(0)
  const logout = ()=>{
    localStorage.removeItem("token")
    setUser({value:null})
    setKey(Math.random())
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      setUser({value:token})
      setKey(Math.random() )
    }
  },[pathName]);

  return (
    <>
      <Navbar logout={logout} user={user} key={key}/>
    </>
  );
}

export default SuperNavBar;
