"use client"

import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here");
  const [output, setOutput] = useState("");

  useEffect(() => {
    // Function to safely evaluate the code and update the output
    const runCode = () => {
      try {
        const result = new Function(code)();
        setOutput(result);
      } catch (e) {
        setOutput(e.message);
      }
    };

    runCode();
  }, [code]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, padding: "10px" }}>
        <h2>Editor</h2>
        <CodeMirror
          value={code}
          options={{
            mode: "javascript",
            theme: "material",
            lineNumbers: true,
          }}
          onBeforeChange={(editor, data, value) => {
            setCode(value);
          }}
        />
      </div>
      <div style={{ flex: 1, padding: "10px", borderLeft: "1px solid #ccc" }}>
        <h2>Output</h2>
        <iframe
          style={{ width: "100%", height: "100%", border: "none" }}
          srcDoc={`<!DOCTYPE html>
            <html>
              <body>
                <script>
                  try {
                    ${code}
                  } catch (e) {
                    document.body.innerText = e.message;
                  }
                </script>
              </body>
            </html>`}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
