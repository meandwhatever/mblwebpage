"use client";

import { useState } from "react";

type Message = { role: "user" | "assistant"; content: string };



export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
  
    const sendMessage = async () => {
        //empty input
      if (!input.trim()) return;
      //get user message
      const userMsg: Message = { role: "user", content: input };
      //update messages to include user message
      const updated = [...messages, userMsg];
      setMessages(updated);
      //clear input
      setInput("");
      //send message to api

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      //get reply
      const { message } = await res.json() as { message: Message };
      //update messages to include assistant message
      setMessages((prev) => [...prev, message]);
    };
  
    return (
      <div className="p-6 max-w-xl mx-auto">
        <div className="h-96 overflow-y-auto border rounded p-4 mb-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <span
                className={`px-3 py-1 rounded ${
                  msg.role === "user"
                    ? "bg-blue-200 text-blue-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.content}
              </span>
            </div>
          ))}
        </div>
  
        <div className="flex">
          <input
            className="flex-1 border rounded-l px-4 py-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message…"
          />
          <button
            onClick={sendMessage}
            className="px-4 bg-blue-600 text-white rounded-r hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    );
  }
