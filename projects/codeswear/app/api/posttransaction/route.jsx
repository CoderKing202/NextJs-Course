export async function POST(req){

    const formData = await req.formData()
    const data = Object.fromEntries(formData.entries())
    // Update status into orders table after checking the transaction status
    // Initiate shipping 
    // Redirect user to the order confimation page

    return Response.json({data})
}