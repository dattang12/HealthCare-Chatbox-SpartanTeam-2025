import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PROXY_URL = "https://healthcare-chatbox-spartanteam-2025.onrender.com";

export default function ChatPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "User";
  const [firstName] = name.split(" ");

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  // Get IAM token via proxy
  async function getIamToken() {
    console.log("🔑 Getting IAM token via proxy...");
    
    try {
      const res = await fetch(`${PROXY_URL}/api/iam-token`, {
        method: "POST",
      });

      console.log("📡 Response status:", res.status);

      if (!res.ok) {
        const error = await res.json();
        console.error("❌ Token error:", error);
        throw new Error(`IAM Error: ${error.message || error.error}`);
      }

      const data = await res.json();
      console.log("✅ IAM token received");
      return data.access_token;
    } catch (err) {
      console.error("❌ Fetch failed:", err);
      throw new Error(`Cannot connect to proxy server at ${PROXY_URL}. Is it running?`);
    }
  }

  // Send message to watsonx.ai via proxy
  async function sendToWatsonx(message, token) {
    console.log("💬 Sending message to watsonx.ai...");
    
    try {
      const res = await fetch(`${PROXY_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, token }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("❌ API Error:", error);
        throw new Error(error.error || "Failed to get response");
      }

      const data = await res.json();
      console.log("✅ Response received:", data);
      
      // Parse watsonx.ai response format
      // Common formats:
      // 1. { choices: [{ message: { content: "..." } }] }
      // 2. { results: [{ generated_text: "..." }] }
      // 3. { output: { text: "..." } }
      // 4. { content: "..." }
      
      const reply =
        data?.choices?.[0]?.message?.content ||
        data?.results?.[0]?.generated_text ||
        data?.output?.text ||
        data?.content ||
        data?.response ||
        data?.text ||
        (typeof data === 'string' ? data : JSON.stringify(data, null, 2));
      
      return reply;
    } catch (error) {
      console.error("❌ Error:", error);
      throw error;
    }
  }

  // Main send function
  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const token = await getIamToken();
      const reply = await sendToWatsonx(userMessage, token);
      setMessages((prev) => [...prev, { sender: "bot", text: String(reply) }]);
    } catch (error) {
      console.error("❌ Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `⚠️ Error: ${error.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      {/* Header */}
      <header className="header">
        <h1 className="title">HealthCare Chatbox</h1>
        <button
          className="login-btn"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Log Out
        </button>
      </header>

      {/* Main Section */}
      <main className="main">
        <h2 className="headline">Welcome to Your Chat, {firstName}</h2>
        <p className="paragraph">
          You can now chat with the AI assistant powered by IBM watsonx.ai.
        </p>

        {/* Chatbox */}
        <div
          style={{
            border: "1px solid #333",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#111",
            maxWidth: "700px",
            margin: "40px auto",
            minHeight: "600px",
            maxHeight: "600px",
            overflowY: "auto",
          }}
        >
          {messages.length === 0 && (
            <p className="paragraph" style={{ color: "#888" }}>
              Start chatting with watsonx.ai...
            </p>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: msg.sender === "user" ? "#1a3a52" : "#1a1a1a",
                textAlign: msg.sender === "user" ? "right" : "left",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#888",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                {msg.sender === "user" ? "You" : "watsonx.ai"}
              </div>
              <div
                style={{
                  color: msg.sender === "user" ? "#5af" : "#ccc",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ color: "#999", textAlign: "center", padding: "20px" }}>
              <span>💬 watsonx.ai is thinking...</span>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
            placeholder="Type your message..."
            disabled={loading}
            style={{
              width: "70%",
              padding: "12px",
              borderRadius: "5px",
              border: "1px solid #555",
              backgroundColor: "#000",
              color: "#fff",
              marginRight: "10px",
              fontSize: "14px",
            }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            style={{
              padding: "12px 24px",
              backgroundColor: loading || !input.trim() ? "#555" : "#5af",
              border: "none",
              borderRadius: "5px",
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        © 2025 HealthCare Chatbot. All rights reserved.
      </footer>
    </div>
  );
}
