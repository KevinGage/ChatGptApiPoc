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

  // console.log(JSON.stringify(req));

  // desctructure system, prompt, temperature, and max_tokens from req
  const { system, messages, temperature, max_tokens } = req;

  console.log("messages to send");
  console.log(messages);

  // prepend the system message to define the context
  messages.unshift({ role: "system", content: system });

  // make a request to the OpenAI API
  const completion = await openai.createChatCompletion({
    model: process.env.OPENAI_API_MODEL,
    // messages: [
    //   { role: "system", content: system },
    //   { role: "user", content: prompt },
    //   { role: "assistant", content: reply },
    // ],
    messages: messages,
    temperature: temperature,
    max_tokens: max_tokens,
  });

  console.log("completion");
  console.log(completion.data);
  console.log(completion.data.choices[0].message);

  return NextResponse.json(completion.data);
}
