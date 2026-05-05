"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import { pathToFileURL } from "url";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setProgress } from "@/store/ProgressSlice";
import { useSelector } from "react-redux";

function SuperNavBar() {
  const progress = useSelector((state)=>state.progress)
  console.log(progress)
  const dispatch = useDispatch()
  const router = useRouter()
  const pathName = usePathname();
  // const [progress, setProgress] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const logout = () => {
    localStorage.removeItem("token");
    setUser({ value: null });
    setKey(Math.random());
    router.push("/")
  };
  useEffect(() => {
    console.log(progress)
    // router.events.on("routeChangeComplete",()=>{ old way
      dispatch(setProgress(100))
    // })
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token });
      setKey(Math.random());
    }
  }, [pathName]);

  return (
    <>
      <LoadingBar
        color="#ff2d55"
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
        waitingTime={400}
      />
      <Navbar logout={logout} user={user} key={key} />
    </>
  );
}

export default SuperNavBar;
