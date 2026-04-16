import React from "react";
import Link from "next/link";
import Product from "@/models/Product";
import connectDb from "../../helper/mongoose";

const page = async () => {
  await connectDb();
  let products = await Product.find({ category: "tshirt" });

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">

            {products.map((item) => {
              return (
                <div
                  key={item._id}
                  className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-2"
                >
                  <Link href={`/product/${item.slug}`}>
                    <img
                      alt="ecommerce"
                      className="m-auto block"
                      src={item.img}
                    />

                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        T-Shirts
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {item.title}
                      </h2>
                      <p className="mt-1">₹{item.price}</p>
                      <p className="mt-1">S, M, XL, XXL</p>
                    </div>
                  </Link>
                </div>
              );
            })}

          </div>
        </div>
      </section>
    </div>
  );
};

export default page;