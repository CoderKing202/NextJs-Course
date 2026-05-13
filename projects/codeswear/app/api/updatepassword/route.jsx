import connectDb from "@/helper/mongoose";
import User from "@/models/User";
import jsonwebtoken from "jsonwebtoken";
import CryptoJS from "crypto-js";

export async function POST(req) {
  await connectDb();
  const body = await req.json();
  let token = body.token;

  let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  
  let dbUser = await User.findOne({ email: user.email });
  const bytes = CryptoJS.AES.decrypt(dbUser.password, process.env.AES_SECRET);
  
  let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
  if (decryptedPass == body.password && body.npassword == body.cpassword) {
    await User.findOneAndUpdate(
      { email: user.email },
      {
        password: CryptoJS.AES.encrypt(
          body.npassword,
          process.env.AES_SECRET,
        ).toString(),
      },
    );
    return Response.json({ success: true }, { status: 200 });
  }

  return Response.json({ success: false }, { status: 200 });
}
