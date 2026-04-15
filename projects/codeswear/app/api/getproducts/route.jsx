import Product from "@/models/Product"
import connectDb from "../../../helper/mongoose"
export  async function GET(){
    await connectDb()
    let products = await Product.find()
    return Response.json({products})    
}