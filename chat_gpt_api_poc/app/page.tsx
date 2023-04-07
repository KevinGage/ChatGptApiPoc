"use client";

import { useState } from "react";
import { ChatRequestType } from "@/types/ChatRequestType";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [temperature, setTemperature] = useState<number>(3);
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  async function chat() {
    setChatHistory((chatHistory) => [...chatHistory, prompt]);

    // TODO: do type checking on user input
    const chatRequest: ChatRequestType = {
      prompt: prompt,
      temperature: temperature / 10,
      max_tokens: 2500,
    };

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify(chatRequest),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    const { usage, choices } = data;

    setChatHistory((chatHistory) => [
      ...chatHistory,
      choices[0].message.content,
      `Total tokens: ${usage.total_tokens}`,
    ]);
  }

  return (
    <main>
      <h1>Chat</h1>
      <form>
        <h2>Settings</h2>
        <label htmlFor="temperature">
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
        <input
          type="text"
          id="prompt"
          name="prompt"
          placeholder="Type your chat message here"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </form>
      <button onClick={chat}>Send</button>
      <button onClick={() => setChatHistory([])}>Clear</button>
      <ul>
        {chatHistory.map((chatMessage) => (
          <li>{chatMessage}</li>
        ))}
      </ul>
    </main>
  );
}
