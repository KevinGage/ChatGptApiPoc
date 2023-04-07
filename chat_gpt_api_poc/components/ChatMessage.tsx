import { ChatMessageType } from "@/types/ChatRequestType";

export default function ChatMessage({ role, content }: ChatMessageType) {
  return (
    <div
      className={
        role === "user"
          ? "bg-green-600 text-white mr-10 my-1 p-2 rounded-md"
          : "bg-cyan-400 text-black ml-10 my-1 p-2 rounded-md"
      }
    >
      {content}
    </div>
  );
}
