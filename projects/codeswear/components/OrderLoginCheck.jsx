"use client"
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const OrderLoginCheck = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  return <div></div>;
};

export default OrderLoginCheck;
