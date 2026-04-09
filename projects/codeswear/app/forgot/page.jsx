"use client";
import Link from "next/link";
import React from "react";
const page = () => {
  return (
    <div className="min-h-full flex items-center justify-center  px-4">
      <div className="w-full max-w-xl">
        <div className="bg-grey-500 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6 my-8">
            <img src="../favicon.ico" className="mx-auto h-12.5 w-15" alt="" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Forgot Password
          </h2>
          <p className="text-center text-sm text-gray-500 mt-2">
            Or
            <Link href="/login">
              <span className="text-pink-600 cursor-pointer"> Login</span>
            </Link>
          </p>

          {/* Form */}
          <form className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              name="email"
            />
            <button
              type="submit"
              className="w-full py-3  bg-pink-600 text-white font-medium hover:bg-pink-700 transition my-2"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
