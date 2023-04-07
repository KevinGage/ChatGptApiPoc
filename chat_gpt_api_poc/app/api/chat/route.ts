import { NextResponse } from "next/server";
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Listen for POST requests to /api/chat
// Expects a JSON body with a prompt property, temperature, and max_tokens
export async function POST(request: Request) {
  const req = await request.json();

  // desctructure system, prompt, temperature, and max_tokens from req
  const { system, prompt, temperature, max_tokens } = req;

  // make a request to the OpenAI API
  const completion = await openai.createChatCompletion({
    model: process.env.OPENAI_API_MODEL,
    messages: [
      { role: "system", content: system },
      { role: "user", content: prompt },
    ],
    temperature: temperature,
    max_tokens: max_tokens,
  });

  // console.log(completion);
  console.log(completion.data);
  console.log(completion.data.choices[0].message);

  return NextResponse.json(completion.data);
}
