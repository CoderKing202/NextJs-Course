export function GET(req){
    let pincodes = {
        "721302":["Kharagpur","West Bengal"],
        "110003":["Delhi","Delhi"],
        "560017":["Banglalore","Karnataka"],
    }

return Response.json(pincodes)
}