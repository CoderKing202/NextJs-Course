"use client";
import { useEffect, useRef, useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { removeFromCart } from "@/store/cartSlice";
import { clearCart } from "@/store/cartSlice";
import { setCart } from "@/store/cartSlice";
import { setProgress } from "@/store/ProgressSlice";
import { usePathname } from "next/navigation";
import { setKey } from "@/store/keySlice";

const NavBar = ({ user, logout }) => {
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch();
  const pathName = usePathname();
  const [dropDown, setDropDown] = useState(false);
  const ref = useRef(null);
  const cart = useSelector((state) => state.cart);
  const subTotal = useSelector((state) => state.cart.subTotal);
  const handleClick = (url) => {
    if (pathName !== url) {
      dispatch(setProgress(40));
    }
  };

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        dispatch(setCart(JSON.parse(savedCart)));
      }
    } catch (ex) {
      console.log(ex);
      localStorage.clear();
    }
  }, [dispatch]);
  useEffect(() => {
    Object.keys(cart.cart).length !== 0 && setSidebar(true);

    
    let exempted = ['/checkout','/orders','/order',"/myaccount"]
    if (exempted.includes(pathName)) {
      setSidebar(false)
    }
  }, []);
  const handleAddToCart = (itemCode, qty, price, name, size, variant) => {
    dispatch(setKey(Math.random()))
    console.log()
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
  const toggleCart = () => {
    setSidebar(!sidebar);
    // if (!ref.current) return;

    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full");
    //   ref.current.classList.add("translate-x-0");
    // } else if (!ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-0");
    //   ref.current.classList.add("translate-x-full");
    // }
  };
  return (
    <>
    <div
      className={`flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow md sticky top-0 bg-white z-10
    
    `}
    >
      <div className="logo mr-auto md:mx-5">
        <Link href="/" onClick={() => handleClick("")}>
          <Image src="/logo.png" width={200} height={40} alt="" />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 font-bold md:text-md">
          <Link href={"/tshirts"} onClick={() => handleClick("/tshirts")}>
            <li className="text-gray-600  hover:text-pink-600">TShirts</li>
          </Link>
          <Link href={"/hoodies"} onClick={() => handleClick("/hoodies")}>
            <li className="text-gray-600 hover:text-pink-600">Hoodies</li>
          </Link>
          <Link href={"/stickers"} onClick={() => handleClick("/stickers")}>
            <li className="text-gray-600 hover:text-pink-600">Stickers</li>
          </Link>
          <Link href={"/mugs"} onClick={() => handleClick("/mugs")}>
            <li className="text-gray-600 hover:text-pink-600">Mugs</li>
          </Link>
        </ul>
      </div>
      <div className="cart absolute right-0 top-4 mx-5 cursor-pointer items-center flex">
        <span
          onMouseOver={() => setDropDown(true)}
          onMouseLeave={() => setDropDown(false)}
        >
          {dropDown && (
            <div
              className="absolute right-5 bg-white shadow-lg border top-6 rounded-md px-5 py-4 w-32"
              onMouseOver={() => setDropDown(true)}
              onMouseLeave={() => setDropDown(false)}
            >
              <ul>
                <Link
                  href={"/myaccount"}
                  onClick={() => handleClick("/myaccount")}
                >
                  <li className="py-1 hover:text-pink-700 text-sm font-bold">
                    My Account
                  </li>
                </Link>
                <Link href={"/orders"} onClick={() => handleClick("/orders")}>
                  <li className="py-1 hover:text-pink-700 text-sm font-bold">
                    My Orders
                  </li>
                </Link>

                <li
                  className="py-1 hover:text-pink-700 text-sm font-bold"
                  onClick={logout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
          {user.value && (
            <MdAccountCircle className="text-xl md:text-2xl mx-2" />
          )}
        </span>
        {!user.value && (
          <Link href="/login" onClick={() => handleClick("")}>
            <button className="bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-2 cursor-pointer">
              Login
            </button>
          </Link>
        )}
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="text-xl md:text-2xl"
        />
      </div>

      <div
        ref={ref}
        className={`w-72 h-[100vh] sideCart top-0 absolute bg-pink-100 px-8 overflow-y-scroll py-10 ${sidebar ? "right-0" : "-right-90"} transition-all ${Object.keys(cart.cart).length !== 0 ? "translate-x-0" : "translate-x-full"}`}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-2 right-2 cursor-pointer text-2xl text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart.cart).length == 0 ? (
            <span className="font-semibold text-md">Your Cart is empty!</span>
          ) : (
            <></>
          )}
          {Object.keys(cart.cart).map((item) => (
            <li key={item}>
              <div className="item flex my-5">
                <div className="w-2/3 font-semibold">
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
        </ol>
        <div className="font-bold my-2">SubTotal: ₹{subTotal}</div>
        <div className="flex">
          <Link href="/checkout" onClick={() => handleClick("/checkout")}>
            <button
              disabled={Object.keys(cart.cart).length === 0}
              className="flex mr-2 mt-1 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none  disabled:bg-pink-300 hover:bg-pink-600 rounded text-sm cursor-pointer"
            >
              <BsBagCheckFill className="m-0.5" />
              Checkout
            </button>
          </Link>
          <button
            disabled={Object.keys(cart.cart).length === 0}
            className="disabled:bg-pink-300 flex mr-2 mt-1 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm  cursor-pointer"
            onClick={() => dispatch(clearCart())}
          >
            <BsBagCheckFill className="m-0.5" />
            Clear Cart
          </button>
        </div>
      </div>
    </div>
    </>
  );
};
export default NavBar;
