"use client";
import { useRef } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart,AiFillCloseCircle,  AiFillPlusCircle, AiFillMinusCircle} from "react-icons/ai";
import { BsBagCheckFill } from "react-icons/bs";

const NavBar = () => {
  const toggleCart = () => {
    if(ref.current.classList.contains("translate-x-full"))
    {
      ref.current.classList.remove("translate-x-full")
      ref.current.classList.add("translate-x-0")
    }
    else if(!ref.current.classList.contains("translate-x-full"))
    {
      ref.current.classList.remove("translate-x-0")
      ref.current.classList.add("translate-x-full")
    }
  };
  const ref = useRef();
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md">
      <div className="logo mx-5">
        <Link href="/">
          <Image src="/logo.png" width={200} height={40} alt="" />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 font-bold md:text-md">
          <Link href={"/tshirts"}>
            <li>TShirt</li>
          </Link>
          <Link href={"/hoodies"}>
            <li>Hoodies</li>
          </Link>
          <Link href={"/stickers"}>
            <li>Stickers</li>
          </Link>
          <Link href={"/mugs"}>
            <li>Mugs</li>
          </Link>
        </ul>
      </div>
      <div className="cart absolute right-0 top-4 mx-5 cursor-pointer"onClick={toggleCart}>
        <AiOutlineShoppingCart className="text-xl md:text-2xl"/>
      </div>
      <div
        ref={ref}
        className="w-72 h-full sideCart absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform translate-x-full"
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
        onClick={toggleCart}
          className="absolute top-2 right-2 cursor-pointer text-2xl text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          <li>
            <div className="item flex my-5">
            <div className="w-2/3 font-semibold">Tshirt - Wear the code</div>
            <div className=" flex items-center justify-center w-1/3 font-semibold text-lg"><AiFillMinusCircle className="cursor-pointer text-pink-500"/><span className="mx-2 text-sm">1</span><AiFillPlusCircle className="cursor-pointer text-pink-500"/></div>
            </div>
          </li>
          
          <li>
            <div className="item flex my-5">
            <div className="w-2/3 font-semibold">Tshirt - Wear the code</div>
            <div className=" flex items-center justify-center w-1/3 font-semibold text-lg"><AiFillMinusCircle className="cursor-pointer text-pink-500"/><span className="mx-2 text-sm">1</span><AiFillPlusCircle className="cursor-pointer text-pink-500"/></div>
            </div>
          </li>
          
          <li>
            <div className="item flex my-5">
            <div className="w-2/3 font-semibold">Tshirt - Wear the code</div>
            <div className=" flex items-center justify-center w-1/3 font-semibold text-lg"><AiFillMinusCircle className="cursor-pointer text-pink-500"/><span className="mx-2 text-sm">1</span><AiFillPlusCircle className="cursor-pointer text-pink-500"/></div>
            </div>
          </li>
          
          <li>
            <div className="item flex my-5">
            <div className="w-2/3 font-semibold">Tshirt - Wear the code</div>
            <div className=" flex items-center justify-center w-1/3 font-semibold text-lg"><AiFillMinusCircle className="cursor-pointer text-pink-500"/><span className="mx-2 text-sm">1</span><AiFillPlusCircle className="cursor-pointer text-pink-500"/></div>
            </div>
          </li>
          
          <li>
            <div className="item flex my-5">
            <div className="w-2/3 font-semibold">Tshirt - Wear the code</div>
            <div className=" flex items-center justify-center w-1/3 font-semibold text-lg"><AiFillMinusCircle className="cursor-pointer text-pink-500"/><span className="mx-2 text-sm">1</span><AiFillPlusCircle className="cursor-pointer text-pink-500"/></div>
            </div>
          </li>
          
          <li>
            <div className="item flex my-5">
            <div className="w-2/3 font-semibold">Tshirt - Wear the code</div>
            <div className=" flex items-center justify-center w-1/3 font-semibold text-lg"><AiFillMinusCircle className="cursor-pointer text-pink-500"/><span className="mx-2 text-sm">1</span><AiFillPlusCircle className="cursor-pointer text-pink-500"/></div>
            </div>
          </li>
          
        </ol>
        <div className="flex">
        <button className="flex mr-2 mt-16 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsBagCheckFill className="m-0.5"/>Checkout</button>
        <button className="flex mr-2 mt-16 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsBagCheckFill className="m-0.5"/>Clear Cart</button>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
