"use client";

import { useState } from "react";
import { ChatRequestType, ChatMessageType } from "@/types/ChatRequestType";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [assistantBehaviour, setAssistantBehaviour] = useState<string>(
    "You are a helpful assistant."
  );
  const [temperature, setTemperature] = useState<number>(3);
  const [messageHistory, setMessageHistory] = useState<ChatMessageType[]>([]);
  const [chatTokens, setChatTokens] = useState<number>(0);

  async function chat() {
    const messages: ChatMessageType[] = [...messageHistory];

    messages.push({ role: "user", content: prompt });

    const chatRequest: ChatRequestType = {
      system: assistantBehaviour,
      messages: messages,
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

    setChatTokens((chatTokens) => chatTokens + usage.total_tokens);

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
        <label htmlFor="behaviour">Assistant behaviour</label>
        <input
          type="text"
          id="behaviour"
          name="behaviour"
          placeholder="Assistant behaviour"
          value={assistantBehaviour}
          onChange={(e) => setAssistantBehaviour(e.target.value)}
        />
        <br />
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
      <button onClick={clearHistory}>Clear</button>
      <ul>
        {messageHistory.map((message, i) => (
          <li key={i}>{message.content}</li>
        ))}
      </ul>
      <h2>Cost</h2>
      <p>Tokens: {chatTokens}</p>
      {/* gpt-3.5-turbo	$0.002 / 1K tokens */}
      <p>${(chatTokens * 0.002) / 1000}</p>
    </main>
  );
}
