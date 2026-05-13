import connectDb from "@/helper/mongoose";
import User from "@/models/User";
import jsonwebtoken from "jsonwebtoken";
export async function POST(req) {
  await connectDb();
  const body = await req.json();
  let token = body.token;
  let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  let dbUser = await User.findOne({ email: user.email });
  const { name, email, address, pincode, phone } = dbUser;
  console.log(dbUser);
  return Response.json(
    { name, email, address, pincode, phone },
    { status: 200 },
  );
}
