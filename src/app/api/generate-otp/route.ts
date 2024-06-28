import { NextResponse } from "next/server";
const axios = require('axios');
//const stripe = new Stripe(env.STRIPE_SECRET_KEY);
export const runtime = "nodejs";

const handler = async (request: Request) => { 
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const socialType = type ?? "facebook"
  console.log("type: ", type);
    const config = {
        method: 'get', 
        url: `https://lz9vo2iuw7.execute-api.us-east-1.amazonaws.com/default/two-factor-auth-meta?social=${socialType}`,
        headers: { 
          'x-api-key': '9uOBNaolMm4uAGBVZBCR43Rl47fOefSo8QUOHR8J'
        }
      };
      
   const result = await axios.request(config)
    .then((response: {data: {
        "current_otp": number
    }}) =>  ({otp: response.data.current_otp, socialType}))
    .catch((error:Error) => {
      console.log(error); 
      return error
    });
    
    return NextResponse.json(result)
     
};

export { handler as GET, handler as POST };
