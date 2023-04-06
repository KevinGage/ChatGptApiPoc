"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    async function getKey() {
      const res = await fetch("/api/chat");

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setApiKey(data.message);
    }
    getKey();
  }, []);

  return (
    <main>
      <h1>Hello World!</h1>
      <p>Api Key: {apiKey}</p>
    </main>
  );
}
