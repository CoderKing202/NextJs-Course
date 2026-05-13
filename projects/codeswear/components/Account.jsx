"use client";
import { useEffect, useState } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsBagCheckFill } from "react-icons/bs";
import Link from "next/link";
import { addToCart, clearCart } from "@/store/cartSlice";
import { useSelector } from "react-redux";
import { removeFromCart } from "@/store/cartSlice";

import { useDispatch } from "react-redux";
import Script from "next/script";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
const page = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPinCode] = useState("");
  const [address, setAddress] = useState("");
  const [userLogin, setUserLogin] = useState({ token: null });
  const [password, setPassword] = useState();
  const [cpassword, setCPassword] = useState();
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("myuser"));
    console.log(user);
    if (!user) {
      router.push("/");
    }
    if (user) {
      setUserLogin(user);
      setEmail(user.email);
    }
  }, []);
  const handleChange = async (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "address") {
      setAddress(e.target.value);
    } else if (e.target.name === "pincode") {
      setPinCode(e.target.value);
    }else if (e.target.name === "password") {
      setPassword(e.target.value);
    }else if (e.target.name === "cpassword") {
      setCPassword(e.target.value);
    }

    setTimeout(() => {
      if (
        name.length > 3 &&
        email.length > 3 &&
        phone.length > 3 &&
        address.length > 3 &&
        pincode.length > 3
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }, 100);
  };
  const handleUserSubmit=async ()=>{
    let data ={token:user.token}
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let txnRes = await a.json();
  }
    
  return (
    <div className="container mx-auto my-9">
      <h1 className="text-3xl text-center font-bold">Update your Account</h1>
      <h2 className="font-semibold text-xl">1. Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={name}
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="address"
              className="leading-7 text-sm text-gray-600"
            >
              Email (cannot be updated)
            </label>

            {userLogin.token ? (
              <input
                type="email"
                onChange={handleChange}
                value={email}
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                readOnly
              />
            ) : (
              <input
                type="email"
                onChange={handleChange}
                value={email}
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            )}
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>

          <textarea
            name="address"
            id="address"
            cols="30"
            rows="2"
            onChange={handleChange}
            value={address}
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone Number
            </label>
            <input
              placeholder="Your 10 Digit Phone Number"
              onChange={handleChange}
              value={phone}
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              PinCode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              onChange={handleChange}
              value={pincode}
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <button className="mb-5 mx-2 disabled:bg-pink-300 flex mt-1 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm cursor-pointer">
        Submit
      </button>
      <h2 className="font-semibold text-xl">2. Change Password</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              value={password}
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              value={cpassword}
              id="cpassword"
              name="cpassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
          <button className="disabled:bg-pink-300 flex mt-1 text-white bg-pink-500 border-0 py-2 px-2 mx-2 focus:outline-none hover:bg-pink-600 rounded text-sm cursor-pointer">Submit</button>
    </div>
  );
};

export default page;
