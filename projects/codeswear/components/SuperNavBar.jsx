"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/navigation";
import { setProgress } from "@/store/ProgressSlice";
import { setUserLogin } from "@/store/UserLoginSlice";
import { clearCart } from "@/store/cartSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setKey } from "@/store/keySlice";

function SuperNavBar() {
  
  const progress = useSelector((state)=>state.progress)
  const userLogin = useSelector((state)=>state.userLogin)
  const key = useSelector((state)=>state.key)
  const dispatch = useDispatch()
  const router = useRouter()
  const pathName = usePathname();
  
  // const [progress, setProgress] = useState(0);
  // const [user, setUser] = useState({ value: null });
  const logout = () => {
    localStorage.removeItem("myuser");
    dispatch(setUserLogin( {value:null} ));
    dispatch(setKey(Math.random()))
    // dispatch(clearCart())
    router.push("/")
  };
  useEffect(() => {
    
    // router.events.on("routeChangeComplete",()=>{ old way
      dispatch(setProgress(100))
    // })
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser) {
      dispatch(setUserLogin({value:myuser.token, email: myuser.email}));
    }
    dispatch(setKey(Math.random()))
  }, [pathName]);

  return (
    <>
      <LoadingBar
        color="#ff2d55"
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
        waitingTime={400}
      />
      {key && <Navbar logout={logout} user={userLogin} key={key} />}
    </>
  );
}

export default SuperNavBar;
