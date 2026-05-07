import User from "@/models/User";
import connectDb from "../../../helper/mongoose";
let CryptoJS = require("crypto-js")

export async function POST(request) {
  await connectDb();
  const body = await request.json();
  const {name ,email} = body
  let u = new User({name,email,password:CryptoJS.AES.encrypt(body.password,process.env.AES_SECRET).toString()});
  await u.save();
  return Response.json({ success: "success" });
}
