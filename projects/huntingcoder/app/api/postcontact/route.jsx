import * as fs from "fs";
import {promises as asyncfs} from "fs"
export async function POST(req) {
  try {
    const body = await req.json();
    let data = await asyncfs.readdir("contactdata")
    console.log(data)
    fs.writeFile(`contactData/${data.length+1}.json`, JSON.stringify(body), () => {});
    return Response.json(["Yes post request"], { status: 200 });
  } catch (error) {}
}
