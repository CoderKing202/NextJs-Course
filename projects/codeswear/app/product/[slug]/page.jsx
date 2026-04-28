import React from "react";
import Item from "../../../components/Item";
import Product from "@/models/Product";
import connectDb from "../../../helper/mongoose";

const Page = async ({ params }) => {
  await connectDb();
  let resolvedParams = await params;
  let product = await Product.findOne({ slug: resolvedParams.slug });
  console.log(product)
  let variants = await Product.find({ title: product.title });

  let colorSizeSlug = {}; // {red: {xl:{slug:'wear-the-code-xl'}}}

  
  for (let item of variants) {
    if(Object.keys(colorSizeSlug).includes(item.color)){
      colorSizeSlug[item.color][item.size] = {slug: item.slug}
    }
    else{
      colorSizeSlug[item.color] = {}
       colorSizeSlug[item.color][item.size] = {slug: item.slug}
    }
  }
  return (
    <> 
      <Item product={JSON.parse(JSON.stringify(product))} variants={JSON.parse(JSON.stringify(colorSizeSlug))}/>
    </>
  );
};

export default Page;
