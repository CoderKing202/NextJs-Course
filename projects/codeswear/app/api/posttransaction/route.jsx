import Order from "@/models/Order";
import connectDb from "../../../helper/mongoose";
import Product from "@/models/Product"

export async function POST(req) {
  await connectDb();
  const formData = await req.formData();
  const body = Object.fromEntries(formData.entries());
  // Validate paytm checksum -- [Pending]
  // Update status into orders table after checking the transaction status
  let order
  if (body.STATUS === "TXN_SUCCESS") {
    order = await Order.findOneAndUpdate(
      { orderId: body.ORDERID },
      { status: "Paid", paymentInfo: JSON.stringify(body) },
    );
    let products = order.products.cart
    
    for(let slug in products)
    {
      console.log(products[slug].qty,"Hello")
      await Product.findOneAndUpdate({slug:slug}, {$inc:{"availableQty": - products[slug].qty}})
    }
    
  } else if (body.STATUS === "PENDING") {
    order = await Order.findOneAndUpdate(
      { orderId: body.ORDERID },
      { status: "Pending", paymentInfo: JSON.stringify(body) },
    );
  }

  // Initiate shipping
  // Redirect user to the order confimation page
  return Response.redirect("http://localhost:3000/order?id=" + order._id + "&clearCart=1", 302);
  //   return Response.json({ body });
}
