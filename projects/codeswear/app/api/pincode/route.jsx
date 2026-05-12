import pincodes from "@/data/pincodes.json"
export function GET(req){
return Response.json(pincodes)
}