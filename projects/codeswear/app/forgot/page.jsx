"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const token = searchParams.get("token");
  const router = useRouter();
  useEffect(() => {
    console.log(token);
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  const handleChange = async (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "cpassword") {
      setCPassword(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    }
  };
  const sendResetEmail = async () => {
    let data = {
      email,
      sendMail: true,
    };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    if (res.success) {
      console.log("Password reset instruction has been sent to your email");
    } else {
      console.log("error")
    }
  };
  const resetPassword = async () => {
    if (password === cpassword) {
      let data = {
        password,
        token,
        sendMail: false,
      };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res = await a.json();
      if (res.success) {
        console.log("Password has been changed");
      } else {
        console.log("error")
      }
    }
  };
  return (
    <div className="min-h-screen flex items-start justify-center pt-12 px-4">
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
          {token && (
            <div>
              <input
                type="password"
                onChange={handleChange}
                value={password}
                placeholder="New Password"
                className="my-3 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                autoComplete="password"
                name="password"
                id="password"
              />
              <input
                type="password"
                value={cpassword}
                onChange={handleChange}
                placeholder="Confirm New Password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                autoComplete="cpassword"
                name="cpassword"
                id="cpassword"
              />

              <button
                onClick={resetPassword}
                type="submit"
                className="w-full py-3 bg-pink-600 text-white font-medium hover:bg-pink-700 transition my-2 disabled:bg-pink-300 cursor-pointer"
              >
                Continue
              </button>

              {password !== cpassword && (
                <span className="text-red-500">Passwords don't Match</span>
              )}
              {password && password == cpassword && (
                <span className="text-green-500">Passwords Match</span>
              )}
            </div>
          )}
          {/* Form */}

          {!token && (
            <>
              <input
                type="email"
                onChange={handleChange}
                value={email}
                placeholder="Email address"
                className="my-3 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                name="email"
              />

              <button
                onClick={sendResetEmail}
                type="submit"
                className="w-full py-3 my-3 bg-pink-600 text-white font-medium hover:bg-pink-700 transition my-2 cursor-pointer"
              >
                Continue
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
