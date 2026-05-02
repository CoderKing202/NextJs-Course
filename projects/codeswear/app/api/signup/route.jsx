import User from "@/models/User";
import connectDb from "../../../helper/mongoose";
let CryptoJS = require("crypto-js")

export async function POST(request) {
  await connectDb();
  const body = await request.json();
  const {name ,email} = body
  let u = new User({name,email,password:CryptoJS.AES.encrypt(body.password,"secret123").toString()});
  await u.save();
  console.log(body);
  return Response.json({ success: "success" });
}
