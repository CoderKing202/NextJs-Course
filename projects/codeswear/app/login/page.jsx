"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (localStorage.getItem("myuser")) {
      router.push("/");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
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
    if (response.success) {
      localStorage.setItem("myuser", JSON.stringify({
        token: response.token,
        email: response.email,
      }));

      toast.success("You are succesfully logged in!", {
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
      setTimeout(() => {
        router.push(process.env.NEXT_PUBLIC_HOST);
      }, 1000);
    } else {
      toast.error(response.error, {
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
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  return (
    <div className="min-h-full flex items-center justify-center  px-4">
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
      <div className="w-full max-w-xl">
        <div className="bg-grey-500 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6 my-8">
            <img src="../favicon.ico" className="mx-auto h-12.5 w-15" alt="" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Sign in to your account
          </h2>
          <p className="text-center text-sm text-gray-500 mt-2">
            Or
            <Link href="/signup">
              <span className="text-pink-600 cursor-pointer"> SignUp</span>
            </Link>
          </p>

          {/* Form */}
          <form
            className="mt-6 space-y-4"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Email address"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <input
              onChange={handleChange}
              id="password"
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <div className="flex items-center justify-between text-sm my-2">
              <Link href="/forgot" className="text-pink-600 hover:underline">
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3  bg-pink-600 text-white font-medium hover:bg-pink-700 transition my-2 cursor-pointer"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
