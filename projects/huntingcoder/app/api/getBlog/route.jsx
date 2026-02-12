// import * as fs from 'fs'
import {promises as fs} from "fs"

export async function GET(req){
  const searchParams = req.nextUrl.searchParams
  const slug = searchParams.get("slug") 
   console.log(searchParams)
//    return new Promise((resolve,reject)=>{
// fs.readFile(`blogData/${slug}.json`,"utf-8",(err,data)=>{
//    if(err) resolve(Response.json({error:"No Such blog found"},{status:500}))
//     resolve(Response.json(JSON.parse(data)))
//    })
//   })
    try{
  const data = await fs.readFile(`blogData/${slug}.json`,"utf-8")
  return Response.json(JSON.parse(data))
    }
    catch(ex){
        return Response.json(({error:"No such Blog found"}))
    }
}