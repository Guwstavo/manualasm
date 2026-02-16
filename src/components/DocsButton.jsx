import React from "react";
import { FaBook } from "react-icons/fa";
import "../styles/docsButton.css";

const DocsButton = () => {
  return (
    <a
      href="https://www.nasm.us/"
      target="_blank"
      rel="noopener noreferrer"
      className="docs-button"
      title="Documentación oficial de NASM"
    >
      <FaBook className="docs-icon" />
      <span className="docs-text">Docs</span>
    </a>
  );
};

export default DocsButton;
