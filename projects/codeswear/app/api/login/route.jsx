import User from "@/models/User";
import connectDb from "../../../helper/mongoose";
import { error } from "console";
export async function POST(request) {
  await connectDb();
  const body = await request.json();
  let user = await User.findOne({ email: body.email });
  console.log(body)
  if (user) {
    if (body.email == user.email && body.password == user.password) {
      return Response.json({
        success: true,
        email: user.email,
        name: user.name,
      });
    }
    return Response.json({
        success: false,
        error:"Invalid Credentials"
      });
  }
  else{
    return Response.json({
        success: false,
        error:"No User found"
      });
  }
  console.log(body);
}
