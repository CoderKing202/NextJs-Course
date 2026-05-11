import Order from "@/models/Order";
import connectDb from "../../../helper/mongoose";
import jsonwebtoken from "jsonwebtoken"

export async function POST(req) {
    await connectDb()
    const body = await req.json()
    const token = body.token
    const data  = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    let orders = await Order.find({email:data.email,status:"Paid"})
        return Response.json({orders},{status:200})
    }