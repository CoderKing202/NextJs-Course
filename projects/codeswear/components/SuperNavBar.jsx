"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import { pathToFileURL } from "url";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/navigation";
import { setProgress } from "@/store/ProgressSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserLogin } from "@/store/UserLoginSlice";
import { clearCart } from "@/store/cartSlice";


function SuperNavBar() {
  const progress = useSelector((state)=>state.progress)
  const userLogin = useSelector((state)=>state.userLogin)

  // console.log(progress)
  const dispatch = useDispatch()
  const router = useRouter()
  const pathName = usePathname();
  // const [progress, setProgress] = useState(0);
  // const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const logout = () => {
    localStorage.removeItem("myuser");
    dispatch(setUserLogin( {value:null} ));
    setKey(Math.random());
    router.push("/")
  };
  useEffect(() => {
    // console.log(progress)
    // router.events.on("routeChangeComplete",()=>{ old way
      dispatch(setProgress(100))
    // })
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser) {
      dispatch(setUserLogin({value:myuser.token, email: myuser.email}));
    }
    setKey(Math.random());
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
