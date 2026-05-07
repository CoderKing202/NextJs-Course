import User from "@/models/User";
import connectDb from "../../../helper/mongoose";
import { error } from "console";
let CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

export async function POST(request) {
  await connectDb();
  const body = await request.json();

  let user = await User.findOne({ email: body.email });
  
  if (user) {
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
    
    if (body.email == user.email && body.password == decryptedPass) {
      var token = jwt.sign(
        {
          email: user.email,
          name: user.name,
        },
        process.env.JWT_SECRET,
      );
      return Response.json({success:true,token});
    }
    //Jatin
    return Response.json({
      success: false,
      error: "Invalid Credentials",
    });
  } else {
    return Response.json({
      success: false,
      error: "No User found",
    });
  }
  
}
