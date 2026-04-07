"use client";
import React, { useEffect } from "react";
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsBagCheckFill } from "react-icons/bs";
import Link from "next/link"
import { addToCart } from "@/store/cartSlice";
import { useSelector } from "react-redux";
import { removeFromCart } from "@/store/cartSlice";
import { clearCart } from "@/store/cartSlice";
import { setCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";

const page = () => {

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const subTotal = useSelector((state)=>state.cart.subTotal)
    console.log(subTotal)
    const handleAddToCart = (itemCode, qty, price, name, size, variant) => {
    let newCartItem = {
      itemCode,
      qty,
      price,
      name,
      size,
      variant,
    };
    dispatch(addToCart(newCartItem));
  };
    const handleRemoveFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCartItem = {
      itemCode,
      qty,
      price,
      name,
      size,
      variant,
    };
    dispatch(removeFromCart(newCartItem));
  };
  
  return (
    <div className="container px-2 sm:m-auto">
      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className="font-semibold text-xl">1. Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        </div>
          <div className="px-2 w-full">
          <div className="mb-4">
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">
              Address
            </label>
      
            <textarea name="address" id="address" cols="30" rows="2"  
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
              
          </div>
        </div>
         <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        </div>
          <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
              PinCode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        </div>
         <h2 className="font-semibold text-xl">2. Review Cart Items & Pay</h2>
           <div
        
        className="sideCart bg-pink-100 p-6 m-2 transform "
      >
        
      
        <ol className="list-decimal font-semibold">
          {Object.keys(cart.cart).length == 0?<span className="font-semibold text-md">Your Cart is empty!</span>:<></>}
          {Object.keys(cart.cart).map((item) => (
            <li key={item}>
              <div className="item flex my-5">
                <div className="font-semibold">
                  {cart.cart[item].name} ({cart.cart[item].size}/
                  {cart.cart[item].variant})
                </div>
                <div className=" flex items-center justify-center w-1/3 font-semibold text-lg">
                  <AiFillMinusCircle
                    className="cursor-pointer text-pink-500"
                    onClick={() => {
                      handleRemoveFromCart(
                        item,
                        1,
                        cart.cart[item].price,
                        cart.cart[item].name,
                        cart.cart[item].size,
                        cart.cart[item].variant,
                      );
                    }}
                  />
                  <span className="mx-2 text-sm">{cart.cart[item].qty}</span>
                  <AiFillPlusCircle
                    className="cursor-pointer text-pink-500"
                    onClick={() => {
                      handleAddToCart(
                        item,
                        1,
                        cart.cart[item].price,
                        cart.cart[item].name,
                        cart.cart[item].size,
                        cart.cart[item].variant,
                      );
                    }}
                  />
                </div>
              </div>
            </li>
            
          ))}
          <span className="font-bold">SubTotal : ₹{subTotal}</span>
        </ol>
      </div>
      <div className="mx-8">
             <Link href="/checkout"><button className="flex mr-2 mt-1 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm cursor-pointer">
            <BsBagCheckFill className="m-0.5" />
            Pay ₹ {subTotal}
          </button></Link>
      </div>
    </div>
  );
};

export default page;
