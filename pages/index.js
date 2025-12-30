import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");

  const submit = async () => {
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });
    const data = await res.json();
    setUrl(data.url);
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "60px auto",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#ffffff"
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Pastebin Lite
      </h1>

      <textarea
        rows="10"
        placeholder="Paste your content here..."
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "98%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "14px",
          resize: "vertical",
          marginBottom: "20px"
        }}
      />

      <button
        onClick={submit}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#4f46e5",
          color: "#ffffff",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Create Paste
      </button>

      {url && (
        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            textAlign: "center"
          }}
        >
          <p style={{ marginBottom: "8px", color: "#555" }}>
            Your paste is available at:
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#2563eb",
              wordBreak: "break-all",
              fontWeight: "bold"
            }}
          >
            {url}
          </a>
        </div>
      )}
    </div>
  );
}