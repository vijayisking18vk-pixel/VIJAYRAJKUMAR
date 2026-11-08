import React from "react";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "24px",
        textAlign: "center",
        fontFamily: "Georgia, 'Times New Roman', Times, serif",
        color: "#1A1B1F",
        backgroundColor: "#FFFFFF",
        fontWeight: "700",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: "700",
          letterSpacing: "0.04em",
          margin: "0 0 12px 0",
          lineHeight: "1.2",
          fontFamily: "Georgia, 'Times New Roman', Times, serif",
          color: "#1A1B1F",
        }}
      >
        R Vijayrajkumar
      </h1>

      <p
        style={{
          fontSize: "clamp(13px, 2vw, 18px)",
          fontWeight: "700",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          margin: "0 0 48px 0",
          fontFamily: "Georgia, 'Times New Roman', Times, serif",
          color: "#1A1B1F",
        }}
      >
        Chief Executive Officer
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <a
          href="https://www.daas.media"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "clamp(14px, 1.8vw, 17px)",
            fontWeight: "700",
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
            color: "#1A1B1F",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          www.daas.media
        </a>
        <a
          href="https://www.chennairents.in"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "clamp(14px, 1.8vw, 17px)",
            fontWeight: "700",
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
            color: "#1A1B1F",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          www.chennairents.in
        </a>
      </div>
    </div>
  );
}
