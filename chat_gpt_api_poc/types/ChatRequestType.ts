export type ChatMessageType = {
  role: "user" | "assistant";
  content: string;
};

export type ChatRequestType = {
  system: string;
  messages: ChatMessageType[];
  temperature: number;
  max_tokens: number;
  token_cost?: number;
  dollar_cost?: number;
};
