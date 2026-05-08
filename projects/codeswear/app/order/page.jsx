import React from 'react'
import Order from '@/models/Order'
import connectDb from '../../helper/mongoose'
async function page({searchParams}) {
  const {id} = await searchParams
  await connectDb()
   let order = await Order.findById(id)
   console.log(order)
  return (
    <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.com</h2>
        <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4">Order id : {order.orderId}</h1>
        <p className="leading-relaxed mb-4">Yayy! your order has been succesfully placed!
          <p>Your status Payment is <span className='font-semibold text-slate-700'>{order.status}</span></p> </p>
         <div className="flex mb-4">
          <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">Item Description</a>
          <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">Quantity</a>
          <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">Item Total</a>
        </div>
        {Object.keys(order.products.cart).map((key)=>(
          <div key = {key}className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">{order.products.cart[key].name}({order.products.cart[key].size} / {order.products.cart[key].variant})</span>
          <span className="m-auto text-gray-900">{order.products.cart[key].qty}</span>
          <span className="m-auto text-gray-900">₹{order.products.cart[key].price}</span>
        </div>
        ))}
     
        <div className="flex flex-col my-8">
          <span className="title-font font-medium text-2xl text-gray-900">SubTotal: ₹{order.amount}</span>
           <div className='my-6'>
          <button className="flex mx-0 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-non
          e hover:bg-pink-600 rounded">Track Order</button>
          </div>
        </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="/order.png"/>
    </div>
  </div>
</section>
  )
}

export default page