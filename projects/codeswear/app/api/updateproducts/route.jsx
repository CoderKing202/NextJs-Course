import Product from "@/models/Product";
import connectDb from "../../../helper/mongoose";
export async function POST(request) {
  await connectDb();
  const body = await request.json();
  console.log(body);
  for (let i = 0; i < body.length; i++) {
    let p = await Product.findByIdAndUpdate(body[i]._id, body[i]);
  }

  return Response.json({ success: "success", status: 200 });
}
