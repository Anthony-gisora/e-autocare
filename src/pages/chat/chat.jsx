import { useState } from "react";
import "./ChatScreen.css";

export default function ChatScreen({ onBack }) {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hey, how can I help you today?", sender: "other" },
    { id: "2", text: "Hi! I’m looking for a mechanic nearby.", sender: "me" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "me",
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <button className="back-btn" onClick={onBack}>
          back
        </button>
        <h2 className="chat-title">Chat</h2>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-bubble ${
              msg.sender === "me" ? "my-message" : "their-message"
            }`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="send-btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
