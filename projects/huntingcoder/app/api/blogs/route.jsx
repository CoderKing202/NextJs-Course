import * as fs from 'fs'

export function GET(req){
  const searchParams = req.nextUrl.searchParams
  const slug = searchParams.get("slug") 
   console.log(searchParams)
   return new Promise((resolve,reject)=>{
fs.readdir(`blogData`,"utf-8",(err,data)=>{
   if(err) resolve(Response.json({error:"No Such blog found"},{status:500}))
    resolve(Response.json(data))
   })
  })
  
}