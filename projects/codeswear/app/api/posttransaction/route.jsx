import Order from "@/models/Order";
import connectDb from "../../../helper/mongoose";

export async function POST(req) {
  await connectDb();
  const formData = await req.formData();
  const body = Object.fromEntries(formData.entries());
  // Validate paytm checksum -- [Pending]
  // Update status into orders table after checking the transaction status
  if (body.STATUS === "TXN_SUCCESS") {
    await Order.findOneAndUpdate(
      { orderId: body.ORDERID },
      { status: "Paid", paymentInfo: JSON.stringify(body) },
    );
  } else if (body.STATUS === "PENDING") {
    await Order.findOneAndUpdate(
      { orderId: body.ORDERID },
      { status: "Pending", paymentInfo: JSON.stringify(body) },
    );
  }
  // Initiate shipping
  // Redirect user to the order confimation page
  return Response.redirect("http://localhost:3000/order", 302);
  //   return Response.json({ body });
}
