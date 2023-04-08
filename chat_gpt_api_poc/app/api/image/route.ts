import { NextResponse } from "next/server";
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Listen for POST requests to /api/image
// Expects a JSON body with a prompt property, number of images to generate, and size
export async function POST(request: Request) {
  const req = await request.json();

  console.log("req");
  console.log(JSON.stringify(req));

  // desctructure system, prompt, and temperature from req
  const { prompt, n, size } = req;

  //Test that n is a number between 1 and 10
  if (isNaN(n) || n < 1 || n > 10) {
    return new NextResponse("n must be a number between 1 and 10", {
      status: 400,
    });
  }

  //Size must be 256x256, 512x512, or 1024x1024
  if (size !== "256x256" && size !== "512x512" && size !== "1024x1024") {
    return new NextResponse("size must be 256x256, 512x512, or 1024x1024", {
      status: 400,
    });
  }

  console.log("passed tests. sending request");

  // make a request to the OpenAI API
  const completion = await openai.createImage({
    prompt: prompt,
    n: n,
    size: size,
  });

  console.log("completion");
  console.log(completion.data);

  return NextResponse.json(completion.data);
}
