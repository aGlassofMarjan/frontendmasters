import React from "react";
import dynamic from "next/dynamic";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1>My Code Editor in Next.js</h1>
      <CodeEditor />
    </div>
  );
}
