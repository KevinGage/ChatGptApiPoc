import { ChatMessageType } from "@/types/ChatRequestType";
import ChatMessage from "./ChatMessage";

export default function ChatPane({
  messages,
}: {
  messages: ChatMessageType[];
}) {
  return (
    <div>
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          role={message.role}
          content={message.content}
        />
      ))}
    </div>
  );
}
