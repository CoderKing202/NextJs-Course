import connectDb from "@/helper/mongoose";
import User from "@/models/User";
import jsonwebtoken from "jsonwebtoken";

export async function POST(req) {
  await connectDb();
  const body = await req.json();
  let token = body.token;

  let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);

  let dbUser = await User.findOneAndUpdate(
    { email: user.email },
    {
      address: body.address,
      pincode: body.pincode,
      phone: body.phone,
      name: body.name,
    },
  );
  const { name, email, address, pincode } = dbUser;

  return Response.json({ success: true }, { status: 200 });
}
