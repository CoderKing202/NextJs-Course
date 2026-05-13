import pincodes from "@/data/pincodes.json"
export function GET(){
return Response.json(pincodes)
}