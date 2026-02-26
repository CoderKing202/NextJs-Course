import * as fs from "fs";

export function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  let count = searchParams.get("count");
  if(!count){
    count = 2
  }
  return new Promise((resolve, reject) => {
    fs.readdir(`blogData`, "utf-8", (err, data) => {
      if (err)
        resolve(
          Response.json({ error: "No Such blog found" }, { status: 500 }),
        );
      let allBlogs = [];
      let length = data.length
      data = data.slice(0,parseInt(count))
      data.forEach((item) => {
        fs.readFile("blogData/" + item,"utf-8", (err, d) => {
          allBlogs.push(JSON.parse(d));
          if (allBlogs.length === data.length) {
            console.log(allBlogs)
            resolve(Response.json({allBlogs, length}));
          }
        });
        
      });

    });
  });
}
