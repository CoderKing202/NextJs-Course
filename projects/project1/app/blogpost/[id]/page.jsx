"use client"
import { useParams } from "next/navigation"

const page=()=>{
const {id} = useParams()

return(
<p>Post: {id}</p>
)
}
export default page