const https = require("https");

const PaytmChecksum = require("paytmchecksum");

export async function POST(req) {
  const body = await req.json();
  console.log(body.oid)
  var paytmParams = {};
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
  )

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
            console.log("Response: ", response);
            resolve(JSON.parse(response));
          });
        });

        post_req.write(post_data);
        post_req.end();
      });
    };
    let myr = await requestAsync()

  return Response.json(myr,{status:200})
}
