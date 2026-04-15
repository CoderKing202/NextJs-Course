import Product from "@/models/Product";
import connectDb from "../../../helper/mongoose";
export async function POST(request) {
 await connectDb()
  const body = await request.json();
  console.log(body)
  for (let i = 0; i < body.length; i++) {
    let p = new Product({
      title: body[i].title,
      slug: body[i].slug,
      desc: body[i].desc,
      img: body[i].img,
      category: body[i].category,
      size: body[i].size,
      color: body[i].color,
      price: body[i].price,
      availableQty: body[i].availableQty,
    });
  
  await p.save();
  }
  
  return Response.json({ success:"success" });
}
