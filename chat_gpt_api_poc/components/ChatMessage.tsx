import { ChatMessageType } from "@/types/ChatRequestType";

export default function ChatMessage({ role, content }: ChatMessageType) {
  return (
    <div
      className={
        role === "user" ? "bg-black text-white" : "bg-white text-black"
      }
    >
      {content}
    </div>
  );
}
