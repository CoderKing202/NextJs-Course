const https = require("https");
import Order from "@/models/Order";
import connectDb from "../../../helper/mongoose";
const PaytmChecksum = require("paytmchecksum");
import Product from "@/models/Product";
import { error } from "console";
export async function POST(req) {
  // console.log(body.oid)
  await connectDb();
  var paytmParams = {};
  // Check if the cart is tampered with
  let product,
    subTotal = 0;
  const body = await req.json();
  if (body.subTotal <= 0) {
    return Response.json(
      {
        success: false,
        error: "Cart Empty! Please build your cart and try again!",
      },
      { status: 200 },
    );
  }
  for (let item in body.cart.cart) {
    subTotal += body.cart.cart[item].price * body.cart.cart[item].qty;
    product = await Product.findOne({ slug: item });
    // console.log("product.price", product.price);
    // console.log("product.", product.price);
    // Check if the cart items are out of stock
    if (product.availableQty < body.cart.cart[item].qty) {
      return Response.json(
        {
          success: false,
          error: "Some items in your cart went out of stock. Please try again!",
        },
        { status: 200 },
      );
    }
    if (product.price != body.cart.cart[item].price) {
      return Response.json(
        {
          success: false,
          error:
            "The price of some items in your cart have changed. Please try again",
        },
        { status: 200 },
      );
    }
  }
  if (subTotal !== body.cart.subTotal) {
    return Response.json(
      {
        success: false,
        error:
          "The price of some items in your cart have changed. Please try again",
      },
      { status: 200 },
    );
  }

  // Check if the details are valid --- [Pending] we will check if the email or address is valid(who knows)
  
  if (body.phone.length !== 10 || !Number.isInteger(Number(body.phone))) {
    return Response.json(
      {
        success: false,
        error: "Please enter your 10 digit phone number",
      },
      { status: 200 },
    );
  }
  console.log(typeof body.pincode)
  if (body.pincode.length !== 6 || !Number.isInteger(Number(body.pincode))) {
    return Response.json(
      {
        success: false,
        error: "Please enter your 6 digit pincode",
      },
      { status: 200 },
    );
  }

  // intiate an order corresponsign to this order id
  let order = new Order({
    email: body.email,
    orderId: body.oid,
    address: body.address,
    amount: body.subTotal,
    products: body.cart,
  });
  await order.save();

  // Insert an entry into the Orders table with status and pending
  paytmParams.body = {
    requestType: "Payment",
    mid: process.env.NEXT_PUBLIC_PAYTM_MID,
    websiteName: "WEBSTAGING",
    orderId: body.oid,
    callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
    txnAmount: {
      value: body.subTotal.toString(),
      currency: "INR",
    },
    userInfo: {
      custId: body.email,
    },
  };

  /*
   * Generate checksum by parameters we have in body
   * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytmpayments.com/next/apikeys
   */
  const checksum = await PaytmChecksum.generateSignature(
    JSON.stringify(paytmParams.body),
    process.env.PAYTM_MKEY,
  );

  paytmParams.head = {
    signature: checksum,
  };

  var post_data = JSON.stringify(paytmParams);
  const requestAsync = () => {
    return new Promise((resolve, reject) => {
      var options = {
        /* for Staging */
        hostname: "securestage.paytmpayments.com",

        /* for Production */
        // hostname: "secure.paytmpayments.com",

        port: 443,
        path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${body.oid}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": post_data.length,
        },
      };

      var response = "";
      var post_req = https.request(options, function (post_res) {
        post_res.on("data", function (chunk) {
          response += chunk;
        });

        post_res.on("end", function () {
          // console.log("Response: ", response);
          let res = JSON.parse(response);
          res.success = true;
          resolve(res);
        });
      });

      post_req.write(post_data);
      post_req.end();
    });
  };
  let myr = await requestAsync();

  return Response.json(myr, { status: 200 });
}
