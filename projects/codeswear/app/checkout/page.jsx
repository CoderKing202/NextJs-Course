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


const CheckOut = () => {
  
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPinCode] = useState("");
  const [address, setAddress] = useState("");
  const cart = useSelector((state) => state.cart);
  const subTotal = useSelector((state) => state.cart.subTotal);
  const [userLogin, setUserLogin] = useState({token:null})
  const [disabled, setDisabled] = useState(true);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('myuser'))

    if(user)
    {
      setUserLogin(user)
      setEmail(user.email)
    }
  }, [])
  
  const handleChange = async (e) => {
    console.log(email)

    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "address") {
      setAddress(e.target.value);
    } else if (e.target.name === "pincode") {
      setPinCode(e.target.value);
      if (e.target.value.length === 6) {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        let pinJson = await pins.json();
        

        if (Object.keys(pinJson).includes(e.target.value)) {
          setState(pinJson[e.target.value][1]);
          setCity(pinJson[e.target.value][0]);
        }
      } else {
        setState("");
        setCity("");
      }
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

  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    // Get a transaction token
    const data = { cart, subTotal, oid, email, name, address, pincode, phone };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let txnRes = await a.json();
    console.log(txnRes.success);
    if (txnRes.success) {
      let txnToken = txnRes.body.txnToken;
      var config = {
        root: "",
        flow: "DEFAULT",
        data: {
          orderId: oid /* update order id */,
          token: txnToken /* update token value */,
          tokenType: "TXN_TOKEN",
          amount: subTotal /* update amount */,
        },
        handler: {
          notifyMerchant: function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          },
        },
      };

      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log("error => ", error);
        });
    } else {
      console.log(txnRes.error);
      // localStorage.removeItem("cart")
      dispatch(clearCart());
      toast.error(txnRes.error, {
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

  return (
    <div className="container px-2 sm:m-auto">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Script
        type="application/javascript"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
      />
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
              Email
            </label>
          
          
          {userLogin.token?<input
              type="email"
              onChange={handleChange}
              value={email}
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly
            />:<input
              type="email"
              onChange={handleChange}
              value={email}
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
            />}
            
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
              Phone
            </label>
            <input
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
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              value={state}
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={handleChange}
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
              value={city}
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <h2 className="font-semibold text-xl">2. Review Cart Items & Pay</h2>
      <div className="sideCart bg-pink-100 p-6 m-2 transform ">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart.cart).length == 0 ? (
            <span className="font-semibold text-md">Your Cart is empty!</span>
          ) : (
            <></>
          )}
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
        <Link href="/checkout">
          <button
            disabled={disabled}
            className="disabled:bg-pink-300 flex mr-2 mt-1 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm cursor-pointer"
            onClick={initiatePayment}
          >
            <BsBagCheckFill className="m-0.5" />
            Pay ₹ {subTotal}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CheckOut;
