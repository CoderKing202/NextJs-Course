import Forgot from "@/models/Forgot";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import connectDb from "../../../helper/mongoose";
import CryptoJS from "crypto-js";

export async function POST(req) {
  // Check if the user exists in the Database
  //Send an email to the user
  await connectDb()
  let body = await req.json();
  console.log(body)
  if (body.sendMail) {
    let token = jwt.sign(
      {
        email: body.email,
      },
      process.env.JWT_SECRET,
    );
    
    let forgot = new Forgot({
      email: body.email,
      token: token,
    });
    forgot.save();
    let email = `We have sent you this email in response to your request to reset your password on Codeswear.com. To reset your password, please follow the link below: <a href="https://codeswear.com/forgot/?token=${token}">Click here to reset your Password</a> 
<br/><br/>
We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your My Account Page and change your password.
<br/><br/>`;
console.log(email)
} else {
    let user = jwt.verify(body.token, process.env.JWT_SECRET);
    let forgotUser = await Forgot.findOne({email:user.email})
    if(!forgotUser)
    {
      return Response.json({ success: false }, { status: 200 });
    }
    if(body.token ===  forgotUser.token)
      {
      // Reset User Password
      console.log(forgotUser)
    
    await User.findOneAndUpdate(
      { email: user.email },
      {
        password: CryptoJS.AES.encrypt(
          body.password,
          process.env.AES_SECRET,
        ).toString(),
      },
    );
    await Forgot.deleteOne({ email: user.email });
  }
  }
  return Response.json({ success: true }, { status: 200 });
}
