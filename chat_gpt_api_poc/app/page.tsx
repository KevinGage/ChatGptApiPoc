"use client";

import { useState } from "react";
import { ChatRequestType, ChatMessageType } from "@/types/ChatRequestType";
import ChatPane from "@/components/ChatPane";
import Waiting from "@/components/Waiting";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [assistantBehaviour, setAssistantBehaviour] = useState<string>(
    "You are a helpful assistant."
  );
  const [temperature, setTemperature] = useState<number>(3);
  const [messageHistory, setMessageHistory] = useState<ChatMessageType[]>([]);
  const [chatTokens, setChatTokens] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function chat(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const messages: ChatMessageType[] = [...messageHistory];

    messages.push({ role: "user", content: prompt });

    const chatRequest: ChatRequestType = {
      system: assistantBehaviour,
      messages: messages,
      temperature: temperature / 10,
    };

    setIsLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify(chatRequest),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    const { usage, choices } = data;

    setChatTokens((chatTokens) => chatTokens + usage.total_tokens);

    setIsLoading(false);

    setMessageHistory([
      ...messages,
      {
        role: "assistant",
        content: choices[0].message.content,
      },
    ]);
  }

  function clearHistory() {
    setMessageHistory([]);
    setChatTokens(0);
  }

  return (
    <main>
      <div className="px-5">
        <div className="bg-slate-50 text-slate-700 text-lg rounded-md mt-2 mb-5 p-2">
          <h2 className="font-extrabold text-xl mb-2">Settings</h2>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="temperature"
            >
              Temperature (Higher gets more random results)
            </label>
            <input
              type="range"
              id="temperature"
              name="temperature"
              value={temperature}
              onChange={(e) => setTemperature(parseInt(e.target.value))}
              min={0}
              max={20}
              step={1}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="behaviour"
            >
              Assistant behaviour
            </label>
            <input
              className="shadow bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="behaviour"
              name="behaviour"
              placeholder="Assistant behaviour"
              value={assistantBehaviour}
              onChange={(e) => setAssistantBehaviour(e.target.value)}
            />
          </div>
        </div>
        <form
          className="bg-slate-50 text-slate-700 text-lg rounded-md my-5 p-2"
          onSubmit={chat}
        >
          <ChatPane messages={messageHistory} />
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="prompt"
            >
              Prompt
            </label>
            <input
              className="shadow bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="prompt"
              name="prompt"
              placeholder="Type your chat message here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          {isLoading && <Waiting />}
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg p-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            type="submit"
          >
            Send
          </button>
          <button
            className="text-white bg-red-700 hover:bg-red-800 rounded-lg p-2 m-2 dark:bg-red-600 dark:hover:bg-red-700"
            onClick={clearHistory}
          >
            Clear
          </button>
        </form>
        <div className="bg-slate-50 text-slate-700 text-lg rounded-md my-5 p-2">
          <h2 className="font-extrabold text-xl mb-2">Chat Total Cost</h2>
          <p>Tokens: {chatTokens}</p>
          {/* gpt-3.5-turbo	$0.002 / 1K tokens */}
          <p>${(chatTokens * 0.002) / 1000}</p>
        </div>
      </div>
    </main>
  );
}
