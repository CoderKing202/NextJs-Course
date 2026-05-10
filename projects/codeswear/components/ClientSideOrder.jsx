"use client"
import { useParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { clearCart } from "@/store/cartSlice";
import { useEffect } from 'react'
function ClientSideOrder({isClearCart}) {
    // const {clearCart} = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
      if(isClearCart == 1){
        dispatch(clearCart())
      }
    }, [])
    
  return (
    <></>
  )
}

export default ClientSideOrder