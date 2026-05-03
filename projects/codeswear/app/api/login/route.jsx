import User from "@/models/User";
import connectDb from "../../../helper/mongoose";
import { error } from "console";
let CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

export async function POST(request) {
  await connectDb();
  const body = await request.json();

  let user = await User.findOne({ email: body.email });
  console.log(body);
  if (user) {
    const bytes = CryptoJS.AES.decrypt(user.password, "secret123");
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
    // console.log(typeof JSON.parse(decryptedPass))
    if (body.email == user.email && body.password == decryptedPass) {
      var token = jwt.sign(
        {
          email: user.email,
          name: user.name,
        },
        "jwtsecret",
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
  console.log(body);
}
