// "use client"
import connectDb from "@/helper/mongoose"
import AdminAllProducts from "@/components/AdminAllProducts"
import Product from "@/models/Product"
const page = async () => {
  await connectDb()
  let products = await Product.find()
   
  return (
    <div>
      <AdminAllProducts products={JSON.parse(JSON.stringify(products))}/>
    </div>
  )
}

export default page
