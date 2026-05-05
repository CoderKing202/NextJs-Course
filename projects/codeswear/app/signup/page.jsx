"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password };
    let res = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();

    console.log(response);
    setEmail("");
    setPassword("");
    setName("");
    toast.success("Yout account has been created!", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });
  };
 useEffect(()=>{
    if(localStorage.getItem("token")){
      router.push("/")
    }
  },[])
  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Bounce}
      />
      <div className="min-h-full flex items-center justify-center  px-4">
        <div className="w-full max-w-xl">
          <div className="bg-grey-500 p-8">
            {/* Logo */}
            <div className="flex justify-center mb-6 my-8">
              <img
                src="../favicon.ico"
                className="mx-auto h-12.5 w-15"
                alt=""
              />
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-semibold text-center text-gray-800">
              Sign up to your account
            </h2>
            <p className="text-center text-sm text-gray-500 mt-2">
              Or
              <Link href="/login">
                <span className="text-pink-600 cursor-pointer"> Login</span>
              </Link>
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4"
              method="POST"
            >
              <input
                onChange={handleChange}
                type="text"
                id="name"
                value={name}
                name="name"
                placeholder="Your name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                onChange={handleChange}
                type="email"
                id="email"
                value={email}
                placeholder="Email address"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                name="email"
              />

              <input
                onChange={handleChange}
                type="password"
                name="password"
                value={password}
                id="password"
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />

              <button
                type="submit"
                className="w-full py-3  bg-pink-600 text-white font-medium hover:bg-pink-700 transition my-2 cursor-pointer"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
