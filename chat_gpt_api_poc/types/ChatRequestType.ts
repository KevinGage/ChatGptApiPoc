export type ChatMessageType = {
  role: "user" | "assistant";
  content: string;
};

export type ChatRequestType = {
  system: string;
  messages: ChatMessageType[];
  temperature: number;
  token_cost?: number;
  dollar_cost?: number;
};
