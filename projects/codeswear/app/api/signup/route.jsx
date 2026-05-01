import User from "@/models/User";
import connectDb from "../../../helper/mongoose";
export async function POST(request) {
  await connectDb();
  const body = await request.json();
  let u = new User(body);
  await u.save();
  console.log(body);
  return Response.json({ success: "success" });
}
