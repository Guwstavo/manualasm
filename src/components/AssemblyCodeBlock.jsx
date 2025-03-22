import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy } from "react-icons/fa";

const AssemblyCodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "#282a36",
          color: "#f8f8f2",
          border: "none",
          padding: "5px 10px",
          cursor: "pointer",
          borderRadius: "5px",
          fontSize: "14px",
        }}
      >
        {copied ? "✔ Copiado" : <><FaCopy /> Copiar</>} 
      </button>

      <SyntaxHighlighter language="nasm" style={dracula} showLineNumbers>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default AssemblyCodeBlock;