import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const AssemblyCodeBlock = ({ code }) => {
  return (
    <SyntaxHighlighter language="nasm" style={dracula} showLineNumbers>
      {code}
    </SyntaxHighlighter>
  );
};

export default AssemblyCodeBlock;
